import React from 'react';
import PropTypes from 'prop-types';

import { Titles, Title, IssuesCount } from './Styles';

import {
  BacklogIssueStatusCopy,
  HistoryIssueStatusCopy,
  IssueStatusCopy,
} from '../../../shared/constants/issues';
import formatIssuesCount from '../../../shared/utils/formatIssueCount';
import getSortedListIssues from '../../../shared/utils/getSortedLists';
import filterIssues from '../../../shared/utils/filterIssues';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.string,
};

const defaultProps = {
  currentUserId: null,
};

const ProjectBacklogTitleList = ({ project, filters, currentUserId, page }) => {
  const filteredIssues = filterIssues(project.issues, filters, currentUserId);

  return (
    <Titles>
      {Object.entries(
        page === 'backlog'
          ? BacklogIssueStatusCopy
          : page === 'history'
          ? HistoryIssueStatusCopy
          : IssueStatusCopy
      ).map((entry, index) => (
        <Title key={index}>
          {`${entry[1]} `}
          <IssuesCount>
            {formatIssuesCount(
              getSortedListIssues(project.issues, entry[0]),
              getSortedListIssues(filteredIssues, entry[0])
            )}
          </IssuesCount>
        </Title>
      ))}
    </Titles>
  );
};

ProjectBacklogTitleList.propTypes = propTypes;
ProjectBacklogTitleList.defaultProps = defaultProps;

export default ProjectBacklogTitleList;
