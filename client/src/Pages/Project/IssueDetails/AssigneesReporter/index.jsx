import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Avatar, Select, Icon } from "../../../../shared/components";

import { SectionTitle } from "../Styles";
import { User, Username } from "./Styles";

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired,
  projectUsers: PropTypes.array.isRequired
};

const ProjectBoardIssueDetailsAssigneesReporter = ({
  issue,
  updateIssue,
  projectUsers
}) => {
  const getUserById = userId => projectUsers.find(user => user.id === userId);

  const userOptions = projectUsers.map(user => ({
    value: user.id,
    label: user.name
  }));

  return (
    <Fragment>
      <SectionTitle>Assignee</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        placeholder="Unassigned"
        name="assignees"
        value={issue.assigneeId}
        options={userOptions}
        onChange={userId => {
          updateIssue({ assigneeId: userId, assignee: userId });
        }}
        renderValue={({ value: userId }) =>
          renderUser(getUserById(userId), true)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId))}
      />

      <SectionTitle>Reporter</SectionTitle>
      <Select
        variant="empty"
        dropdownWidth={343}
        withClearValue={false}
        name="reporter"
        value={issue.reporterId}
        options={userOptions}
        onChange={userId =>
          updateIssue({ reporterId: userId, reporter: userId })
        }
        renderValue={({ value: userId }) =>
          renderUser(getUserById(userId), true)
        }
        renderOption={({ value: userId }) => renderUser(getUserById(userId))}
      />
    </Fragment>
  );
};

const renderUser = (user, isSelectValue, removeOptionValue) => (
  <User
    key={user.id}
    isSelectValue={isSelectValue}
    withBottomMargin={!!removeOptionValue}
    onClick={() => removeOptionValue && removeOptionValue()}
  >
    <Avatar avatarUrl={user.avatarUrl} name={user.name} size={24} />
    <Username>{user.name}</Username>
    {removeOptionValue && <Icon type="close" top={1} />}
  </User>
);

ProjectBoardIssueDetailsAssigneesReporter.propTypes = propTypes;

export default ProjectBoardIssueDetailsAssigneesReporter;
