import React from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Issue from "./Issue";
import { List, Issues, AddIssue } from "./Styles";
import filterIssues from "../../../../shared/utils/filterIssues";
import getSortedListIssues from "../../../../shared/utils/getSortedLists";
import Icon from "../../../../shared/components/Icon";

const propTypes = {
  status: PropTypes.string.isRequired,
  filters: PropTypes.object.isRequired,
  currentUserId: PropTypes.string
};

const defaultProps = {
  currentUserId: null
};

const ProjectBoardList = ({
  status,
  users,
  issues,
  filters,
  currentUserId,
  issueCreateModalOpen
}) => {
  const filteredIssues = filterIssues(issues, filters, currentUserId);
  const filteredListIssues = getSortedListIssues(filteredIssues, status);

  return (
    <Droppable key={status} droppableId={status}>
      {provided => (
        <List>
          <Issues
            {...provided.droppableProps}
            ref={provided.innerRef}
            data-testid={`board-list:${status}`}
          >
            {filteredListIssues.map((issue, index) => (
              <Issue
                key={issue.id}
                projectUsers={users}
                issue={issue}
                index={index}
              />
            ))}
            {provided.placeholder}
            {status === "unplanned" && (
              <AddIssue onClick={issueCreateModalOpen}>
                <Icon type="plus" size={28} />
                <div style={{ marginTop: "-2px" }}>Add</div>
              </AddIssue>
            )}
          </Issues>
        </List>
      )}
    </Droppable>
  );
};

ProjectBoardList.propTypes = propTypes;
ProjectBoardList.defaultProps = defaultProps;

export default ProjectBoardList;
