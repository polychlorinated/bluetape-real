import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import useMergeState from '../../../shared/hooks/mergeState';
import { Breadcrumbs, Modal } from '../../../shared/components';

import Header from './header';
import Filters from '../Filters';
import IssueDetails from '../IssueDetails';
import ProjectBoardEpics from '../Rows';

import ProjectBoardTitleList from '../Titles';
import { TitlesAndLists } from '../Styles';
import useCurrentUser from '../../../shared/hooks/currentUser';
import { connect } from 'react-redux';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBoard = ({ project, fetchProject, epicDetailsModalOpen }) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { currentUserId } = useCurrentUser();

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      {/* <Breadcrumbs items={['Projects', project.name, 'To Review']} /> */}
      <Header project={project} fetchProject={fetchProject} />
      <Filters
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />

      <TitlesAndLists>
        <ProjectBoardTitleList
          filters={filters}
          project={project}
          currentUserId={currentUserId}
          page="board"
        />
        <ProjectBoardEpics
          filters={filters}
          project={project}
          epicDetailsModalOpen={epicDetailsModalOpen}
          fetchProject={fetchProject}
          page="board"
        />
      </TitlesAndLists>

      <Route
        path={`${match.path}/issues/:issueId`}
        render={(routeProps) => (
          <Modal
            isOpen
            testid="modal:issue-details"
            width={1040}
            withCloseIcon={false}
            onClose={() => {
              history.goBack();
            }}
            renderContent={(modal) => (
              <IssueDetails
                page="board"
                issueId={routeProps.match.params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                modalClose={modal.close}
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

ProjectBoard.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.projectState.project,
});

export default connect(mapStateToProps)(ProjectBoard);
