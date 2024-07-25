import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import useMergeState from '../../../shared/hooks/mergeState';
import Header from './Header';
import Filters from './Filters';
import ProjectsTable from './ProjectsTable';

const propTypes = {
  projects: PropTypes.array.isRequired,
  openCreateProjectModal: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
};

const ProjectBoard = ({
  projects,
  openCreateProjectModal,
  fetchProjects,
  inviteMemberModalHelpers,
}) => {
  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      <Header
        openCreateProjectModal={openCreateProjectModal}
        inviteMemberModalHelpers={inviteMemberModalHelpers}
      />
      <Filters
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <div style={{ paddingTop: '50px', overflowX: 'auto' }}>
        <ProjectsTable
          projects={projects}
          filters={filters}
          fetchProjects={fetchProjects}
        />
      </div>
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

export default ProjectBoard;
