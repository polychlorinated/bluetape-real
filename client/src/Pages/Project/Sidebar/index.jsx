import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch } from 'react-router-dom';

import { ProjectTypeCopy } from '../../../shared/constants/projects';
import { Icon, ProjectAvatar } from '../../../shared/components';

import {
  Sidebar,
  ProjectInfo,
  ProjectTexts,
  ProjectName,
  ProjectCategory,
  Divider,
  LinkItem,
  LinkText,
  NotImplemented,
  Item,
  ItemText,
} from './Styles';
import { setOrgProjects } from '../../../redux/project/project-reducer';
import { connect } from 'react-redux';
import { Left } from '../IssueDetails/Styles';

const ProjectSidebar = (props) => {
  const match = useRouteMatch();

  return (
    <Sidebar className="project__sidebar">
      <ProjectInfo>
        <ProjectAvatar />
        <ProjectTexts>
          <ProjectName>{props.project.name}</ProjectName>
          <ProjectCategory>
            {ProjectTypeCopy[props.project.category]} Project
          </ProjectCategory>
        </ProjectTexts>
      </ProjectInfo>

      {props.userRole === 'owner' &&
        renderLinkItem(match, 'To Review', 'board', '/board')}
      {renderLinkItem(match, 'Backlog', 'plus', '/backlog')}
      {renderLinkItem(match, 'History', 'menu', '/history')}
      {props.userRole === 'owner' &&
        renderLinkItem(match, 'Project settings', 'settings', '/settings')}
      <Divider />
      {renderLinkItem(match, 'Back to Projects', 'arrow-left', '../projects')}
    </Sidebar>
  );
};

const renderLinkItem = (match, text, iconType, path) => {
  const isImplemented = !!path;

  const linkItemProps = isImplemented
    ? {
        as: NavLink,
        exact: true,
        to: path.includes('..')
          ? `${path.replaceAll('.', '')}`
          : `${match.url}${path}`,
      }
    : { as: 'div' };

  return (
    <LinkItem {...linkItemProps}>
      <Icon type={iconType} />
      <LinkText>{text}</LinkText>
      {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
    </LinkItem>
  );
};

const mapStateToProps = (state) => {
  console.log(state.userState.user);
  if (
    state.userState.user.role === 'owner' &&
    !state.userState.user.isHalfOwner
  )
    return { userRole: state.userState.user.role };
  else {
    return { userRole: 'member' };
  }
};

export default connect(mapStateToProps)(ProjectSidebar);
