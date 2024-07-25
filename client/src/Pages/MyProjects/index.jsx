import React, { useEffect } from 'react';

import useApi from '../../shared/hooks/api';
import { createQueryParamModalHelpers } from '../../shared/utils/queryParamModal';
import { PageLoader, PageError, Modal } from '../../shared/components';
import {
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  useHistory,
} from 'react-router-dom';
import Board from './Board';
import NavbarLeft from '../../shared/components/NavbarLeft';
import { ProjectPage } from './Styles';
import ProjectCreate from './ProjectCreate';
import { connect } from 'react-redux';
import { setOrgProjects } from '../../redux/project/project-reducer';
import InviteMember from './Board/InviteMember/index';
const MyProjects = ({ userId, setOrgProjects }) => {
  const projectCreateModalHelpers = createQueryParamModalHelpers(
    'project-create'
  );
  const params = useParams();
  const history = useHistory();
  const inviteMemberModalHelpers = createQueryParamModalHelpers(
    'invite-member'
  );
  const [{ data, error }, fetchProjects] = useApi.get(`/project/${userId}`);
  useEffect(() => {
    let mounted = true;
    if (mounted && data) {
      setOrgProjects(data.projects);
    }
    return function cleanup() {
      mounted = false;
    };
  }, [data, setOrgProjects]);
  if (!data) return <PageLoader />;
  if (error) return <PageError />;

  const { projects, members, owner } = data;
  const users = members.concat(owner);
  console.log(users, 'current users');
  return (
    <ProjectPage>
      <NavbarLeft />
      <div>
        <Board
          projects={projects}
          users={users}
          fetchProjects={fetchProjects}
          openCreateProjectModal={projectCreateModalHelpers.open}
          inviteMemberModalHelpers={inviteMemberModalHelpers.open}
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
              <InviteMember project={projects} modalClose={modal.close} />
            )}
          />
        )}
        {projectCreateModalHelpers.isOpen() && (
          <Modal
            isOpen
            testid="modal:project-create"
            width={800}
            withCloseIcon={true}
            onClose={projectCreateModalHelpers.close}
            renderContent={(modal) => (
              <ProjectCreate
                projects={projects}
                users={users}
                fetchProjects={fetchProjects}
                onCreate={modal.close}
                modalClose={modal.close}
              />
            )}
          />
        )}
      </div>
    </ProjectPage>
  );
};

const mapStateToProps = (state) => ({
  userId: state.userState.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  setOrgProjects: (data) => dispatch(setOrgProjects(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProjects);
