import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ProjectType,
  ProjectTypeCopy,
} from '../../../shared/constants/projects';
import toast from '../../../shared/utils/toast';
import useApi from '../../../shared/hooks/api';
import { Form, Breadcrumbs, Avatar, Icon } from '../../../shared/components';
import { HeaderRightContent } from '../../MyProjects/Board/Header/Styles';
import NotificationHandler from '../../../shared/components/Notifications';
import CreateMap from '../../../shared/components/CreateMap';
import { Player } from 'video-react';

import {
  FormCont,
  FormHeading,
  FormElement,
  ActionButton,
  Header,
  ActionButtonHeader,
  ImageContainer,
  Image,
  FullContainer,
  MapContainer,
} from './Styles';
import { connect } from 'react-redux';
import {
  SelectItem,
  SelectItemLabel,
} from '../../MyProjects/ProjectCreate/Styles';
import { getTextContentsFromHtmlString } from '../../../shared/utils/browser';
import { useEffect } from 'react';
import { useRef } from 'react';
import axios from 'axios';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  openInvitationModal: PropTypes.func.isRequired,
};

const ProjectSettings = ({ project, fetchProject, openInvitationModal }) => {
  const [files, setFiles] = useState({});
  const fileRef = useRef();
  const [lnglat, setLngLat] = useState();
  const [inputShow, setInputShow] = useState('none');
  const [{ isUpdating }, updateProject] = useApi.put(
    `/project/manage/${project._id}`
  );
  useEffect(() => {
    if (project.location) {
      setInputShow('block');
      setLngLat({
        isRandom: project.location.isRandom,
        lat: project.location.latitude,
        lng: project.location.longitude,
      });
    }
  }, []);
  return (
    <React.Fragment>
      <Form
        initialValues={Form.initialValues(project, (get) => ({
          name: get('name'),

          description: getTextContentsFromHtmlString(get('description')),
          projectLead: project.projectLead.id,
        }))}
        validations={{
          name: [Form.is.required(), Form.is.maxLength(100)],

          projectLead: Form.is.required(),
        }}
        onSubmit={async (values, form) => {
          values = {
            ...values,
            location: {
              latitude: `${lnglat.lat}`,
              longitude: `${lnglat.lng}`,
              isRandom: lnglat ? lnglat.isRandom : true,
            },
          };
          try {
            await updateProject(values);
            if (files.file) {
              let url = `https://testapi.bluetape.io/v1/project/postImage/${project.key}`;
              let fd = new FormData();
              fd.append('file', files.file);
              await axios.post(url, fd);
              setFiles({});
            }
            await fetchProject();
            toast.success('Changes have been saved successfully.');
          } catch (error) {
            Form.handleAPIError(error, form);
          }
        }}
      >
        <FormCont>
          <FormElement>
            {/* <Breadcrumbs
              items={['Projects', project.name, 'Project Details']}
            /> */}
            <Header>
              <FormHeading>Project Details</FormHeading>
              <HeaderRightContent>
                <NotificationHandler />
                <ActionButtonHeader
                  type="button"
                  onClick={openInvitationModal}
                  variant="success"
                >
                  Invite Members
                </ActionButtonHeader>
              </HeaderRightContent>
            </Header>
            <FullContainer>
              {project.file ? (
                <ImageContainer
                  onClick={(e) => {
                    fileRef.current.click();
                  }}
                >
                  <input
                    id="file"
                    name="file"
                    ref={fileRef}
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      event.preventDefault();
                      setFiles({ file: event.target.files[0] });
                    }}
                  ></input>

                  {files.file ? (
                    files.file.name
                  ) : project.file.includes('video') ? (
                    <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
                      <video
                        controls
                        style={{ width: '100%', height: '100%' }}
                        src={`https://testapi.bluetape.io/files/${project.file}`}
                      />
                    </div>
                  ) : (
                    <Image
                      src={`https://testapi.bluetape.io/files/${project.file}`}
                    ></Image>
                  )}
                </ImageContainer>
              ) : (
                <React.Fragment>
                  {project.file ? (
                    <div>I am here</div>
                  ) : (
                    <input
                      id="file"
                      name="file"
                      type="file"
                      onChange={(event) => {
                        event.preventDefault();
                        setFiles({ file: event.target.files[0] });
                      }}
                    ></input>
                  )}
                </React.Fragment>
              )}

              {project.location.latitude ? (
                <MapContainer>
                  <CreateMap lnglat={lnglat} setLngLat={setLngLat} />
                </MapContainer>
              ) : (
                ''
              )}
            </FullContainer>

            <Form.Field.Input name="name" label="Name" />
            <Form.Field.TextEditor
              name="description"
              label="Description"
              tip="Describe the project in as much detail as you'd like."
            />

            <Form.Field.Select
              name="projectLead"
              label="Team lead"
              options={userOptions(project.users)}
              renderOption={renderUser(project.users, true)}
              renderValue={renderUser(project.users, true)}
            />

            <ActionButton
              type="submit"
              variant="primary"
              isWorking={isUpdating}
            >
              Save changes
            </ActionButton>
          </FormElement>
        </FormCont>
      </Form>
    </React.Fragment>
  );
};

const userOptions = (users) =>
  users.map((user) => ({ value: user.id, label: user.name }));

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

const categoryOptions = Object.values(ProjectType).map((category) => ({
  value: category,
  label: ProjectTypeCopy[category],
}));

ProjectSettings.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.project.project,
});

export default connect(mapStateToProps)(ProjectSettings);
