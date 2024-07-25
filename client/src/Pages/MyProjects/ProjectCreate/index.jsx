import React from 'react';
import PropTypes from 'prop-types';
import toast from '../../../shared/utils/toast';
import useApi from '../../../shared/hooks/api';
import useCurrentUser from '../../../shared/hooks/currentUser';
import { Form, Icon, Avatar } from '../../../shared/components';
import { connect } from 'react-redux';
import axios from 'axios';
import CreateMap from '../../../shared/components/CreateMap';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';
import {
  ProjectType,
  ProjectTypeCopy,
} from '../../../shared/constants/projects';
import { useState } from 'react';
import { useRef } from 'react';

const propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
};

const CreateProject = ({
  fetchProjects,
  onCreate,
  modalClose,
  orgId,
  users,
}) => {
  const [{ isCreating }, createProject] = useApi.post(`/project/${orgId}`);
  const [files, setFiles] = useState({});
  const [lnglat, setLngLat] = useState();
  const { currentUserId } = useCurrentUser();

  return (
    <div>
      <Form
        enableReinitialize
        initialValues={{
          projectName: '',
          description: '',
          category: '',
          key: '',
          projectLead: currentUserId,
        }}
        validations={{
          description: [Form.is.required(), Form.is.maxLength(200)],
          projectName: [Form.is.required(), Form.is.maxLength(40)],
          key: Form.is.required(),
          projectLead: Form.is.required(),
        }}
        onSubmit={async (values) => {
          try {
            await createProject({
              name: values.projectName,
              description: values.description,
              key: values.key,
              projectLead: values.projectLead,
              location: {
                longitude: `${lnglat ? lnglat.lng : -74.05625923095704}`,
                latitude: `${lnglat ? lnglat.lat : 40.88761465238926}`,
                isRandom: lnglat ? lnglat.isRandom : true,
                // isRandom: lnglat
                //   ? lnglat.isRandom === false
                //     ? false
                //     : true
                //   : true,
              },
            });
            if (files.file) {
              let url = `https://testapi.bluetape.io/v1/project/postImage/${values.key}`;
              let fd = new FormData();
              fd.append('file', files.file);
              await axios.post(url, fd);
            }
            await fetchProjects();
            toast.success('Project created successfully!');
            onCreate();
          } catch (error) {
            toast.error(error);
          }
        }}
      >
        <FormElement>
          <FormHeading>Create project</FormHeading>
          <div>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(event) => {
                event.preventDefault();
                setFiles({ file: event.target.files[0] });
              }}
            />
          </div>
          <Divider />
          <CreateMap
            className="some-cname"
            lnglat={lnglat}
            setLngLat={setLngLat}
            type="projectCreate"
          />
          <Divider />
          <Form.Field.Input
            name="projectName"
            label="Name"
            tip="What should we call your project?"
          />
          <Form.Field.Input
            name="description"
            label="Short Summary"
            tip="Concisely summarize the project in one or two sentences."
          />
          <Form.Field.Input
            name="key"
            disabled={true}
            style={{
              display: 'float',
              height: '0px',
              color: 'transparent',
            }}
          />
          <Form.Field.Select
            name="projectLead"
            label="Team lead"
            options={userOptions(users)}
            renderOption={renderUser(users)}
            renderValue={renderUser(users)}
          />
          <Actions>
            <ActionButton
              type="submit"
              variant="primary"
              isWorking={isCreating}
            >
              Create Project
            </ActionButton>
            <ActionButton type="button" variant="empty" onClick={modalClose}>
              Cancel
            </ActionButton>
          </Actions>
        </FormElement>
      </Form>
    </div>
  );
};

const typeOptions = Object.values(ProjectType).map((type) => ({
  value: type,
  label: ProjectTypeCopy[type],
}));

const userOptions = (users) =>
  users.map((user) => ({ value: user.id, label: user.name }));

const renderType = ({ value: type }) => (
  <SelectItem>
    <SelectItemLabel>{ProjectTypeCopy[type]}</SelectItemLabel>
  </SelectItem>
);

const renderUser = (users) => ({ value: userId, removeOptionValue }) => {
  const user = users.find(({ id }) => id === userId);

  return (
    <SelectItem
      key={user.id}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <Avatar size={20} avatarUrl={user.avatarUrl} name={user.name} />
      <SelectItemLabel>{user.name}</SelectItemLabel>
      {removeOptionValue && <Icon type="close" top={2} />}
    </SelectItem>
  );
};

CreateProject.propTypes = propTypes;

const mapStateToProps = (state) => ({
  orgId: state.userState.user.orgId,
});

export default connect(mapStateToProps)(CreateProject);
