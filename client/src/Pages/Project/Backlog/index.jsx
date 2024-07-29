import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, useRouteMatch, useHistory } from 'react-router-dom';

import useMergeState from '../../../shared/hooks/mergeState';
import { Breadcrumbs, Modal } from '../../../shared/components';

import Header from './header';
import Filters from '../Filters';
import IssueDetails from '../IssueDetails';
import {
  TitlesAndLists,
  Image,
  ImageContainer,
  FullContainer,
  MapContainer,
} from '../Styles';
import ProjectBacklogTitleList from '../Titles';
import ProjectBacklogEpics from '../Rows';
import useCurrentUser from '../../../shared/hooks/currentUser';
import { connect } from 'react-redux';
import ShowMap from '../../../shared/components/ShowMap';
import { Divider } from '../Sidebar/Styles';

const propTypes = {
  project: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
  epicDetailsModalOpen: PropTypes.func.isRequired,
};

const defaultFilters = {
  searchTerm: '',
  userIds: [],
  myOnly: false,
  recent: false,
};

const ProjectBacklog = ({
  project,
  fetchProject,
  epicCreateModalOpen,
  issueCreateModalOpen,
  epicDetailsModalOpen,
}) => {
  const match = useRouteMatch();
  const history = useHistory();
  const { currentUserId } = useCurrentUser();

  const [filters, mergeFilters] = useMergeState(defaultFilters);

  return (
    <Fragment>
      {/* <Breadcrumbs items={['Projects', project.name, 'Backlog']} /> */}

      <Header
        epicCreateModalOpen={epicCreateModalOpen}
        fetchProject={fetchProject}
        projectId={project._id}
        sprintStatus={project.sprintStatus}
      />
      <FullContainer>
        {!project.file ? null : project.file.includes('video') ? (
          <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <video
              controls
              style={{ width: '100%', height: '100%' }}
              src={`${process.env.REACT_APP_API_URL}/files/${project.file}`}
            />
          </div>
        ) : (
          <ImageContainer>
            <Image
              src={`${process.env.REACT_APP_API_URL}/${project.file}`}
              alt="Some Picture"
            />
          </ImageContainer>
        )}

        {project.location.latitude ? (
          <MapContainer>
            <ShowMap
              latitude={project.location.latitude}
              longitude={project.location.longitude}
              isRandom={project.location.isRandom}
            />
          </MapContainer>
        ) : (
          ''
        )}
      </FullContainer>
      <Filters
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
          page="backlog"
        />
        <ProjectBacklogEpics
          filters={filters}
          project={project}
          fetchProject={fetchProject}
          issueCreateModalOpen={issueCreateModalOpen}
          page="backlog"
          epicDetailsModalOpen={epicDetailsModalOpen}
        />
      </TitlesAndLists>
      <Route
        path={`${match.path}/issues/:issueId/:bte?`}
        render={(routeProps) => (
          <Modal
            isOpen
            testid="modal:issue-details"
            width={1040}
            withCloseIcon={false}
            className="issueDetails"
            onClose={() => {
              history.goBack();
            }}
            renderContent={(modal) => (
              <IssueDetails
                issueId={routeProps.match.params.issueId}
                projectUsers={project.users}
                fetchProject={fetchProject}
                modalClose={modal.close}
                page="backlog"
              />
            )}
          />
        )}
      />
    </Fragment>
  );
};

ProjectBacklog.propTypes = propTypes;

const mapStateToProps = (state) => ({
  project: state.project.project,
});

export default connect(mapStateToProps)(ProjectBacklog);
