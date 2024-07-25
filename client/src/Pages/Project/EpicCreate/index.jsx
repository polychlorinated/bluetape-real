import React from 'react';
import PropTypes from 'prop-types';

import {
  CategoryType,
  CategoryTypesCopy,
  IssuePriority,
} from '../../../shared/constants/issues';

import { EpicPriorityCopy } from '../../../shared/constants/epics';
import toast from '../../../shared/utils/toast';
import useApi from '../../../shared/hooks/api';
import { Form } from '../../../shared/components';

import {
  FormHeading,
  FormElement,
  SelectItem,
  SelectItemLabel,
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

const ProjectEpicCreate = ({ project, fetchProject, onCreate, modalClose }) => {
  const [{ isCreating }, createEpic] = useApi.post(`/epic/${project._id}`);

  return (
    <Form
      enableReinitialize
      initialValues={{
        location: '',
        epicTitle: CategoryType.PLUMBING,
        description: '',
        priority: IssuePriority.MEDIUM,
      }}
      validations={{
        epicTitle: [Form.is.required(), Form.is.maxLength(200)],
        priority: Form.is.required(),
        location: Form.is.required(),
      }}
      onSubmit={async (values, form) => {
        try {
          await createEpic({
            description: values.description,
            title: values.epicTitle,
            key: `${project.key}-${project.totalEpics + 1}`,
            projectId: project._id,
            priority: values.priority,
            creationDate: Date.now(),
            location: values.location,
          });
          await fetchProject();
          toast.success('Epic has been successfully created.');
          onCreate();
        } catch (error) {
          Form.handleAPIError(error, form);
        }
      }}
    >
      <FormElement>
        <FormHeading>Create Category</FormHeading>
        <Form.Field.Input name="location" label="Location" />
        <Form.Field.Select
          name="epicTitle"
          label="Category"
          tip="Cateogory you want to add."
          options={categoryOptions}
          renderOption={renderCategory}
          renderValue={renderCategory}
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Add
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

const categoryOptions = Object.values(CategoryType).map((type) => ({
  value: type,
  label: CategoryTypesCopy[type],
}));

const renderCategory = ({ value: type }) => (
  <SelectItem>
    <SelectItemLabel>{CategoryTypesCopy[type]}</SelectItemLabel>
  </SelectItem>
);

ProjectEpicCreate.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.projectState.project,
});

export default connect(mapStateToProps)(ProjectEpicCreate);
