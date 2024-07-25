import React from 'react';
import {
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  useHistory,
} from 'react-router-dom';
import useApi from '../../shared/hooks/api';
import { createQueryParamModalHelpers } from '../../shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from '../../shared/components';
import NavbarLeft from '../../shared/components/NavbarLeft';
import Sidebar from './Sidebar';
import Board from './Board';

import IssueCreate from './IssueCreate';
import ProjectSettings from './ProjectSettings';
import { ProjectPage } from './Styles';
import Backlog from './Backlog';
import EpicCreate from './EpicCreate';
import { connect } from 'react-redux';
import { setProject } from '../../redux/project/project-reducer';
import EpicDetails from './EpicDetails';
import History from './History';
import InviteMember from './ProjectSettings/InviteMember';
import { useState } from 'react';

const Project = ({ setProject, epicUnderView }) => {
  const match = useRouteMatch();
  const params = useParams();
  const history = useHistory();
  const [sidebar, setSidebar] = useState();
  const issueCreateModalHelpers = createQueryParamModalHelpers('issue-create');
  const epicCreateModalHelpers = createQueryParamModalHelpers('epic-create');
  const epicDetailsModalHelpers = createQueryParamModalHelpers('epic-details');
  const inviteMemberModalHelpers = createQueryParamModalHelpers(
    'invite-member'
  );

  const [{ data, error }, fetchProject] = useApi.get(
    `/project/manage/${params.id}`
  );

  if (!data) return <PageLoader />;
  if (error) return <PageError />;
  let { project } = data;
  // let issues = project.epics.filter((el) => {
  //   return el.totalIssues !== 0;
  // });
  // project = { ...project, epics: issues };
  setProject(project);
  console.log(project, 'projectprojectprojectprojectproject');
  return (
    <ProjectPage className="project__board">
      <NavbarLeft sidebar={sidebar} setSidebar={setSidebar} />

      <div className="project__fullContainer">
        {sidebar ? (
          <Sidebar
            setSidebar={setSidebar}
            className="project__sidebar"
            project={project}
          />
        ) : (
          ''
        )}

        <div
          className="project__container"
          onClick={(e) => {
            setSidebar(false);
          }}
        >
          {issueCreateModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:issue-create"
              width={800}
              withCloseIcon={true}
              onClose={() => {
                history.goBack();
              }}
              renderContent={(modal) => (
                <IssueCreate
                  fetchProject={fetchProject}
                  onCreate={modal.close}
                  modalClose={modal.close}
                />
              )}
            />
          )}

          {epicCreateModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:epic-create"
              width={800}
              withCloseIcon={false}
              onClose={() => {
                history.goBack();
              }}
              renderContent={(modal) => (
                <EpicCreate
                  fetchProject={fetchProject}
                  onCreate={modal.close}
                  modalClose={modal.close}
                />
              )}
            />
          )}

          {epicDetailsModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:epic-details"
              width={1040}
              withCloseIcon={false}
              onClose={() => {
                history.goBack();
              }}
              renderContent={(modal) => (
                <EpicDetails
                  epic={epicUnderView}
                  projectUsers={project.users}
                  fetchProject={fetchProject}
                  modalClose={modal.close}
                />
              )}
            />
          )}
          <Route
            path={`${match.path}/board`}
            render={() => (
              <Board
                fetchProject={fetchProject}
                epicDetailsModalOpen={epicDetailsModalHelpers.open}
              />
            )}
          />

          <Route
            path={`${match.url}/backlog`}
            render={() => (
              <Backlog
                issueCreateModalOpen={issueCreateModalHelpers.open}
                epicCreateModalOpen={issueCreateModalHelpers.open}
                ///// Changed to save a lot of work just passing issue from here
                epicDetailsModalOpen={epicDetailsModalHelpers.open}
                fetchProject={fetchProject}
              />
            )}
          />

          <Route
            path={`${match.path}/history`}
            render={() => {
              return (
                <History
                  issueCreateModalOpen={issueCreateModalHelpers.open}
                  epicCreateModalOpen={epicCreateModalHelpers.open}
                  epicDetailsModalOpen={epicDetailsModalHelpers.open}
                  fetchProject={fetchProject}
                />
              );
            }}
          />
          <Route
            path={`${match.path}/settings`}
            render={() => {
              return (
                <ProjectSettings
                  fetchProject={fetchProject}
                  openInvitationModal={inviteMemberModalHelpers.open}
                />
              );
            }}
          />
          {inviteMemberModalHelpers.isOpen() && (
            <Modal
              isOpen
              testid="modal:invite-member"
              width={500}
              withCloseIcon={false}
              onClose={() => {
                history.goBack();
              }}
              renderContent={(modal) => (
                <InviteMember project={project} modalClose={modal.close} />
              )}
            />
          )}
          {match.isExact && <Redirect to={`${match.url}/backlog`} />}
        </div>
      </div>
    </ProjectPage>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setProject: (project) => dispatch(setProject(project)),
});
const mapStateToProps = (state) => ({
  epicUnderView: state.epicState.epicUnderView,
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
