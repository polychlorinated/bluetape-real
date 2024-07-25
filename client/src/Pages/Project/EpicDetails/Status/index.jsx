import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  BacklogIssueStatus,
  BacklogIssueStatusCopy,
  IssueStatus,
  IssueStatusCopy
} from "../../../../shared/constants/issues";
import { Select, Icon } from "../../../../shared/components";

import { SectionTitle } from "../Styles";
import { Status } from "./Styles";

const propTypes = {
  issue: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  updateIssue: PropTypes.func.isRequired
};

const ProjectBoardIssueDetailsStatus = ({ issue, updateIssue, page }) => (
  <Fragment>
    <SectionTitle>Status</SectionTitle>
    <Select
      variant="empty"
      dropdownWidth={343}
      withClearValue={false}
      name="status"
      value={issue.status}
      options={
        page === "board"
          ? Object.values(IssueStatus).map(status => ({
              value: status,
              label: IssueStatusCopy[status]
            }))
          : Object.values(BacklogIssueStatus).map(status => ({
              value: status,
              label: BacklogIssueStatusCopy[status]
            }))
      }
      onChange={status => updateIssue({ status })}
      renderValue={({ value: status }) => (
        <Status isValue color={status}>
          <div>
            {page === "board"
              ? IssueStatusCopy[status]
              : BacklogIssueStatusCopy[status]}
          </div>
          <Icon type="chevron-down" size={18} />
        </Status>
      )}
      renderOption={({ value: status }) => (
        <Status color={status}>
          {page === "board"
            ? IssueStatusCopy[status]
            : BacklogIssueStatusCopy[status]}
        </Status>
      )}
    />
  </Fragment>
);

ProjectBoardIssueDetailsStatus.propTypes = propTypes;

export default ProjectBoardIssueDetailsStatus;
