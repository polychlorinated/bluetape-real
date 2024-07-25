import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';

import {
  IssueLink,
  Issue,
  Title,
  Bottom,
  Assignees,
  AssigneeAvatar,
} from './Styles';

const propTypes = {
  projectUsers: PropTypes.array.isRequired,
  issue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  stage: PropTypes.string.isRequired,
};

const ProjectBoardListIssue = ({ projectUsers, issue, stage }) => {
  const match = useRouteMatch();

  const assignee = projectUsers.find((user) => user.id === issue.assigneeId);

  const getStage = () => {
    return stage;
  };

  return (
    <IssueLink
      to={`${match.url}/${getStage()}/issues/${issue.id}/true`}
      data-testid="list-issue"
    >
      <Issue>
        <Title>{issue.title}</Title>
        <Bottom>
          {assignee && (
            <Assignees>
              <AssigneeAvatar
                key={assignee.id}
                size={24}
                avatarUrl={assignee.avatarUrl}
                name={assignee.name}
              />
            </Assignees>
          )}
        </Bottom>
      </Issue>
    </IssueLink>
  );
};

ProjectBoardListIssue.propTypes = propTypes;

export default ProjectBoardListIssue;
