import React from 'react';
import PropTypes from 'prop-types';

import api from '../../../shared/utils/api';
import toast from '../../../shared/utils/toast';
import { Button, ConfirmModal } from '../../../shared/components';

const propTypes = {
  fetchProject: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
};

const SprintEnd = ({ fetchProject, projectId }) => {
  const handleSprintEnd = async (modal) => {
    try {
      await api.get(`/project/end_sprint/${projectId}`);
      toast.success('Issue was send to archive!');
      modal.close();
      await fetchProject();
    } catch (error) {
      toast.error(error);
      modal.close();
    }
  };

  return (
    <ConfirmModal
      title="Archive Reviewed"
      message="Everything that is in *REVIEWED* will be moved to history."
      confirmText="Archive"
      onConfirm={handleSprintEnd}
      renderLink={(modal) => (
        <Button variant="primary" onClick={modal.open}>
          Archive Reviewed
        </Button>
      )}
    />
  );
};

SprintEnd.propTypes = propTypes;

export default SprintEnd;
