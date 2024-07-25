import React from "react";
import PropTypes from "prop-types";

import { EpicNameWrapper, TypeLabel } from "./Styles";
import EpicTypeIcon from "../../../../shared/components/EpicIcon";

const propTypes = {
  issue: PropTypes.object.isRequired,
  updateIssue: PropTypes.func.isRequired
};

const ProjectBoardIssueDetailsType = ({ epic }) => (
  <EpicNameWrapper>
    <EpicTypeIcon type={"component"} color={"green"} top={1} />
    <TypeLabel>EPIC {epic.key}</TypeLabel>
  </EpicNameWrapper>
);

ProjectBoardIssueDetailsType.propTypes = propTypes;

export default ProjectBoardIssueDetailsType;
