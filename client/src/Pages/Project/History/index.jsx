import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import useMergeState from '../../../shared/hooks/mergeState';
import { Breadcrumbs, Modal } from '../../../shared/components';

import Header from './header';
import Filters from '../Filters';
import IssueDetails from '../IssueDetails';
import { TitlesAndLists } from '../Styles';
import ProjectBacklogTitleList from '../Titles';
import ProjectBacklogEpics from '../Rows';
import useCurrentUser from '../../../shared/hooks/currentUser';
import { connect } from 'react-redux';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectHistory = ({
  project,
  fetchProject,
  epicCreateModalOpen,
  epicDetailsModalOpen,
}) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { currentUserId } = useCurrentUser();

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      {/* <Breadcrumbs items={["Projects", project.name, "Backlog"]} /> */}
      <Header epicCreateModalOpen={epicCreateModalOpen} />
      <Filters
        page="history"
        projectUsers={project.users}
        defaultFilters={defaultFilters}
        filters={filters}
        mergeFilters={mergeFilters}
      />
      <TitlesAndLists>
        <ProjectBacklogTitleList
          filters={filters}
          project={project}
          currentUserId={currentUserId}
          page="history"
        />
        <ProjectBacklogEpics
          filters={filters}
          project={project}
          fetchProject={fetchProject}
          epicDetailsModalOpen={epicDetailsModalOpen}
          page="history"
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
                issueId={routeProps.match.params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                modalClose={modal.close}
                page="history"
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

ProjectHistory.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.projectState.project,
});

export default connect(mapStateToProps)(ProjectHistory);
