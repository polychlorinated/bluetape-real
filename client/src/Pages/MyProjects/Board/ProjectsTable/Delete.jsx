import React from "react";
import PropTypes from "prop-types";

import api from "../../../../shared/utils/api";
import toast from "../../../../shared/utils/toast";
import { ConfirmModal } from "../../../../shared/components";
import { TypeIcon } from "./Styes";

const propTypes = {
  fetchProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired
};

const ProjectDelete = ({ project, fetchProjects }) => {
  const handleProjectDelete = async () => {
    try {
      await api.delete(`/project/manage/${project.id}`);
      await fetchProjects();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <ConfirmModal
      title="Are you sure you want to delete this project?"
      message="Once you delete, the project and all it's children will be lost"
      confirmText="Delete project"
      onConfirm={handleProjectDelete}
      renderLink={modal => (
        <div onClick={modal.open}>
          <TypeIcon type="trash" color="red" size={22} />
        </div>
      )}
    />
  );
};

ProjectDelete.propTypes = propTypes;

export default ProjectDelete;
