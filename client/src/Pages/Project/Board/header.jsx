import React from 'react';
import { Header, BoardName } from '../Styles';
import { Right, SprintInfo } from './Styles';
import SprintEnd from './sprint';
import { HeaderRightContent } from '../../MyProjects/Board/Header/Styles';
import NotificationHandler from '../../../shared/components/Notifications';
import Sprint from '../Backlog/Sprint';
import { connect } from 'react-redux';

const ProjectBoardHeader = ({ project, fetchProject, user }) => {
  // let sprintOverDue = false;
  // const startDate = new Date(Date.now());
  // const endDate = new Date(
  //   new Date().setFullYear(new Date().getFullYear() + 1)
  // );
  // let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
  // if (seconds < 0) {
  //   sprintOverDue = true;
  //   seconds = Math.abs(seconds);
  // }
  // let minutes = Math.floor(seconds / 60);
  // let hours = Math.floor(minutes / 60);
  // let days = Math.floor(hours / 24);
  // hours = hours - days * 24;

  return (
    <Header>
      <BoardName>To Review</BoardName>
      <HeaderRightContent>
        <NotificationHandler />
        {project.sprintStatus === 'active' && (
          <Right>
            {/* {project.sprintStatus === 'active' && (
              <SprintInfo sprintOverDue={sprintOverDue}>
                {sprintOverDue
                  ? `Sprint overdue by ${days} ${
                      days > 1 ? 'days' : 'day'
                    }, ${hours} hours`
                  : `Sprint ends in ${days} days, ${hours} hours`}
              </SprintInfo>
            )} */}
            {project.sprintStatus === 'active' &&
              ((user.role === 'owner' && !user.isHalfOwner) ||
                user.id === project.projectLead.id) && (
                <SprintEnd
                  fetchProject={fetchProject}
                  projectId={project._id}
                />
              )}
          </Right>
        )}
      </HeaderRightContent>
    </Header>
  );
};

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(ProjectBoardHeader);
