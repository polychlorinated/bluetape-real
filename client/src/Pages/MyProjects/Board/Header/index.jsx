import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../../../shared/components';
import { Header, BoardName } from './Styles';
import { connect } from 'react-redux';
import { HeaderRightContent } from './Styles';
import NotificationHandler from '../../../../shared/components/Notifications';

const propTypes = {
  user: PropTypes.object.isRequired,
  openCreateProjectModal: PropTypes.func.isRequired,
};

const ProjectBoardHeader = ({
  openCreateProjectModal,
  user,
  inviteMemberModalHelpers,
}) => (
  <Header>
    <BoardName>My Projects</BoardName>
    <HeaderRightContent>
      <NotificationHandler />
      {user.role === 'owner' && !user.isHalfOwner && (
        <React.Fragment>
          <Button onClick={openCreateProjectModal} variant="primary">
            Create Project
          </Button>
          <Button onClick={inviteMemberModalHelpers} variant="primary">
            Invite Members
          </Button>
        </React.Fragment>
      )}
    </HeaderRightContent>
  </Header>
);

ProjectBoardHeader.propTypes = propTypes;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

export default connect(mapStateToProps)(ProjectBoardHeader);
