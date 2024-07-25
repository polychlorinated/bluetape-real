import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-beautiful-dnd';

import useCurrentUser from '../../../shared/hooks/currentUser';
import api from '../../../shared/utils/api';
import {
  BacklogIssueStatus,
  HistoryIssueStatus,
  IssueStatus,
} from '../../../shared/constants/issues';

import List from './List';
import { Lists } from './Styles';
import { updateLocalIssues } from '../../../redux/project/project-reducer';
import { connect } from 'react-redux';

const propTypes = {
  filters: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
};

const ProjectBoardLists = ({
  issues,
  users,
  fetchProject,
  filters,
  issueCreateModalOpen,
  updateLocalIssues,
  page,
}) => {
  const { currentUserId } = useCurrentUser();

  const handleIssueDrop = async ({ draggableId, destination, source }) => {
    if (!isPositionChanged(source, destination)) return;

    const issueId = draggableId;
    const updatedIssues = issues.map((iss) => {
      if (iss.id === issueId) {
        iss.status = destination.droppableId;
      }
      return iss;
    });
    updateLocalIssues(updatedIssues);
    await api.optimisticUpdate(`/issue/${issueId}`, {
      status: destination.droppableId,
    });
    await fetchProject();
  };
  console.log(issues, '/////////////////');
  return (
    <DragDropContext onDragEnd={handleIssueDrop}>
      <Lists>
        {Object.values(
          page === 'backlog'
            ? BacklogIssueStatus
            : page === 'history'
            ? HistoryIssueStatus
            : IssueStatus
        ).map((status) => (
          <List
            key={status}
            status={status}
            users={users}
            issues={issues}
            filters={filters}
            currentUserId={currentUserId}
            issueCreateModalOpen={issueCreateModalOpen}
          />
        ))}
      </Lists>
    </DragDropContext>
  );
};

const isPositionChanged = (destination, source) => {
  if (
    !destination ||
    !destination.droppableId ||
    !source ||
    !source.droppableId
  )
    return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

ProjectBoardLists.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  updateLocalIssues: (issues) => dispatch(updateLocalIssues(issues)),
});

export default connect(null, mapDispatchToProps)(ProjectBoardLists);
