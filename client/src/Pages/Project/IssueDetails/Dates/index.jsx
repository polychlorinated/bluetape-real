import React from "react";
import PropTypes from "prop-types";

import { formatDateTimeConversational } from "../../../../shared/utils/dateTime";

import { Dates } from "./Styles";

const propTypes = {
  issue: PropTypes.object.isRequired
};

const ProjectBoardIssueDetailsDates = ({ issue }) => (
  <Dates>
    <div>Created {formatDateTimeConversational(issue.creationDate)}</div>
  </Dates>
);

ProjectBoardIssueDetailsDates.propTypes = propTypes;

export default ProjectBoardIssueDetailsDates;
