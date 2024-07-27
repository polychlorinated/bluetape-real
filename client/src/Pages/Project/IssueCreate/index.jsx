import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  IssuePriority,
  IssuePriorityCopy,
  BacklogIssueStatus,
} from '../../../shared/constants/issues';
import toast from '../../../shared/utils/toast';
import useApi from '../../../shared/hooks/api';
import useCurrentUser from '../../../shared/hooks/currentUser';
import {
  Form,
  Icon,
  Avatar,
  IssuePriorityIcon,
} from '../../../shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
  Divider,
  Actions,
  ActionButton,
} from './Styles';
import { connect } from 'react-redux';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectIssueCreate = ({
  project,
  fetchProject,
  onCreate,
  modalClose,
  epicToBeUpdated,
}) => {
  const [{ isCreating }, createIssue] = useApi.post('/issue');
  const [files, setFiles] = useState({});

  const { currentUserId } = useCurrentUser();

  return (
    <Form
      enableReinitialize
      initialValues={{
        title: '',
        description: '',
        reporterId: currentUserId,
        epicId: epicToBeUpdated,
        assigneeId: '',
        estimate: '',
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        title: [Form.is.required(), Form.is.maxLength(200)],
        reporterId: Form.is.required(),
        epicId: Form.is.required(),
        priority: Form.is.required(),
      }}
      onSubmit={async (values) => {
        if (!files.file) return toast.error('Please provide an image!');
        const epic = getEpicById(project, values.epicId);

        let reqObject = {
          reporter: values.reporterId,
          reporterId: values.reporterId,
          epicId: values.epicId,
          estimate: values.estimate,
          description: values.description,
          priority: values.priority,
          title: values.title,
          type: values.type,
          status: BacklogIssueStatus.UNPLANNED,
          key: `${epic.key}.${epic.totalIssues + 1}`,
          projectId: project.id,
          creationDate: Date.now(),
          deadline: values.deadline,
          location: values.location,
        };

        if (values.assigneeId) {
          reqObject = {
            ...reqObject,
            assignee: values.assigneeId,
            assigneeId: values.assigneeId,
          };
        }
        try {
          await createIssue(reqObject);
          let url = `https://testapi.bluetape.io/v1/issue/postImage/${
            epic.key
          }*${epic.totalIssues + 1}`;
          let fd = new FormData();
          fd.append('file', files.file);

          await axios.post(url, fd);
          await fetchProject();
          toast.success('Issue has been successfully created.');
          onCreate();
        } catch (error) {
          toast.error('Issue creation failed!');
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Task</FormHeading>
        <input
          id="file"
          name="file"
          type="file"
          required
          onChange={(event) => {
            event.preventDefault();
            setFiles({ file: event.target.files[0] });
          }}
        />
        <Form.Field.Select
          name="epicId"
          label="Category"
          tip="Select the category you want to add the issue into."
          options={epicOptions(project)}
          renderOption={renderEpic(project)}
          renderValue={renderEpic(project)}
        />
        <Form.Field.Input name="location" label="Location" />
        <Divider />
        <Form.Field.Input
          name="title"
          label="Task Summary"
          tip="Concisely summarize the issue in one or two sentences."
        />
        <Form.Field.TextEditor
          name="description"
          label="Description"
          tip="Describe the issue in as much detail as you'd like."
        />
        <Form.Field.Select
          name="reporterId"
          label="Reporter"
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Select
          name="assigneeId"
          label="Assignee"
          tio="People who are responsible for dealing with this issue."
          options={userOptions(project)}
          renderOption={renderUser(project)}
          renderValue={renderUser(project)}
        />
        <Form.Field.Input
          name="estimate"
          type="number"
          label="Time Estimate"
          tip="Optional"
        />
        <Form.Field.Input
          name="deadline"
          type="Date"
          label="Deadline"
          tip="Deadline for completing the task."
        />
        <Form.Field.Select
          name="priority"
          label="Priority"
          tip="Priority in relation to other issues."
          options={priorityOptions}
          renderOption={renderPriority}
          renderValue={renderPriority}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Create Issue
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const priorityOptions = Object.values(IssuePriority).map((priority) => ({
  value: priority,
  label: IssuePriorityCopy[priority],
}));

const userOptions = (project) =>
  project.users.map((user) => ({ value: user.id, label: user.name }));

const getEpicById = (project, epicId) => {
  return project.epics.find((epic) => epic.id === epicId);
};

const epicOptions = (project) => {
  return project.epics.map((epic) => ({ value: epic.id, label: epic.key }));
};

const renderPriority = ({ value: priority }) => (
  <SelectItem>
    <IssuePriorityIcon priority={priority} top={1} />
    <SelectItemLabel>{IssuePriorityCopy[priority]}</SelectItemLabel>
  </SelectItem>
);

const renderUser = (project) => ({ value: userId, removeOptionValue }) => {
  const user = project.users.find(({ id }) => id === userId);

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

const renderEpic = (project) => ({ value: epicId, removeOptionValue }) => {
  const epic = project.epics.find(({ id }) => id === epicId);

  return (
    <SelectItem
      key={epic.id}
      withBottomMargin={!!removeOptionValue}
      onClick={() => removeOptionValue && removeOptionValue()}
    >
      <SelectItemLabel>
        {epic.key} {epic.title}
      </SelectItemLabel>
      {removeOptionValue && <Icon type="close" top={2} />}
    </SelectItem>
  );
};

ProjectIssueCreate.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.project.project,
});

export default connect(mapStateToProps)(ProjectIssueCreate);
