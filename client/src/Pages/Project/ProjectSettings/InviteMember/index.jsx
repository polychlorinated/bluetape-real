import React from 'react';
import PropTypes from 'prop-types';
import toast from '../../../../shared/utils/toast';
import useApi from '../../../../shared/hooks/api';
import { Form } from '../../../../shared/components';

import { ActionButton, FormElement, FormHeading, Actions } from './Styles';
import { connect } from 'react-redux';

const propTypes = {
  project: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const InviteMemberToProject = ({ project, user, modalClose }) => {
  const [{ isCreating }, inviteMember] = useApi.post(`/project/invite`);

  return (
    <Form
      enableReinitialize
      initialValues={{
        email: '',
      }}
      validations={{
        email: [Form.is.required(), Form.is.email()],
      }}
      onSubmit={async (values) => {
        if (values.email === user.email) {
          toast.error('Already a member!');
          return;
        }
        const code = Math.random()
          .toString(36)
          .substr(2, 6)
          .toUpperCase();
        try {
          await inviteMember({
            email: values.email,
            invitationCode: code,
            projectId: project._id,
            orgId: user.orgId,
          });
          navigator.clipboard.writeText(`${code}`);
          toast.success(
            `Invitation Code: ${code}.\n Code has been copied to clipboard!😉`,
            0
          );
          toast.success('Invitation Sent!');
          modalClose();
        } catch (error) {
          toast.error(error);
        }
      }}
    >
      <FormElement>
        <FormHeading>Invite member</FormHeading>
        <Form.Field.Input
          name="email"
          label="Email"
          tip="Type email of new team member"
        />
        <Actions>
          <ActionButton type="submit" variant="primary" isWorking={isCreating}>
            Invite
          </ActionButton>
          <ActionButton type="button" variant="empty" onClick={modalClose}>
            Cancel
          </ActionButton>
        </Actions>
      </FormElement>
    </Form>
  );
};

InviteMemberToProject.propTypes = propTypes;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(InviteMemberToProject);
