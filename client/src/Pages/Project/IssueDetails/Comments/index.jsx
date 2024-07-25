import React from 'react';
import PropTypes from 'prop-types';

import { sortByNewest } from '../../../../shared/utils/javascript';

import Create from './Create';
import Comment from './Comment';
import { Comments, Scrollable, Title } from './Styles';

const propTypes = {
  issue: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsComments = ({ issue, fetchIssue, role }) => {
  return (
    <Comments>
      <Title>Comments</Title>
      <Create issueId={issue.id} fetchIssue={fetchIssue} />
      <Scrollable>
        {sortByNewest(issue.comments, 'creationDate')
          .reverse()
          .map((comment) => (
            <Comment
              role={role}
              key={comment.id}
              comment={comment}
              fetchIssue={fetchIssue}
            />
          ))}
      </Scrollable>
    </Comments>
  );
};

ProjectBoardIssueDetailsComments.propTypes = propTypes;

export default ProjectBoardIssueDetailsComments;
