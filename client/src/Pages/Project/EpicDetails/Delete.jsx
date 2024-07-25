import React from "react";
import PropTypes from "prop-types";

import api from "../../../shared/utils/api";
import toast from "../../../shared/utils/toast";
import { Button, ConfirmModal } from "../../../shared/components";

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired
};

const ProjectBoardIssueDetailsDelete = ({ epic, fetchProject, modalClose }) => {
  const handleEpicDelete = async () => {
    try {
      await api.delete(`/epic/manage/${epic.id}`);
      modalClose();
      await fetchProject();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this epic?"
      message="Once you delete, the epic and child issues are gone for good."
      confirmText="Delete epic"
      onConfirm={handleEpicDelete}
      renderLink={modal => (
        <Button
          icon="trash"
          iconSize={19}
          variant="empty"
          onClick={modal.open}
        />
      )}
    />
  );
};

ProjectBoardIssueDetailsDelete.propTypes = propTypes;

export default ProjectBoardIssueDetailsDelete;
