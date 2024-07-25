import React from 'react';
import PropTypes from 'prop-types';

import api from '../../../../shared/utils/api';
import toast from '../../../../shared/utils/toast';
import { Button } from '../../../../shared/components';
import Modal from './Modal';
import { connect } from 'react-redux';

const propTypes = {
  fetchProject: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  issues: PropTypes.array.isRequired,
};

const Index = ({ projectId, fetchProject, issues }) => {
  const issuesPlanned = issues.filter((issue) => issue.status === 'planned')
    .length;
  // const issuesUnplanned = issues.filter((issue) => issue.status === 'unplanned')
  // .length;

  const handleStartSprint = async (noOfWeeks, modal) => {
    if (!issuesPlanned) {
      toast.error('Nothing present to send for review!');
      modal.close();
      return;
    }
    try {
      await api.post(`/project/start_sprint/${projectId}`, { noOfWeeks });
      await fetchProject();
      toast.success('Sent to admin for review!');
      modal.close();
    } catch (error) {
      toast.error(error);
      modal.close();
    }
  };

  return (
    <Modal
      title="Confirm"
      confirmText="Send"
      onConfirm={handleStartSprint}
      renderLink={(modal) =>
        issuesPlanned ? (
          <Button
            variant="primary"
            style={{ width: '100%' }}
            onClick={modal.open}
          >
            Send For Review
          </Button>
        ) : (
          ''
        )
      }
    />
  );
};

Index.propTypes = propTypes;

const mapStateToProps = (state) => ({
  issues: state.projectState.project.issues,
});

export default connect(mapStateToProps)(Index);
