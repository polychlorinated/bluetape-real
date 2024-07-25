import React from "react";
import PropTypes from "prop-types";

import { formatDateTimeConversational } from "../../../../shared/utils/dateTime";

import { Dates } from "./Styles";

const propTypes = {
  epic: PropTypes.object.isRequired
};

const ProjectBoardEpicDetailsDates = ({ epic }) => (
  <Dates>
    <div>Created {formatDateTimeConversational(epic.creationDate)}</div>
  </Dates>
);

ProjectBoardEpicDetailsDates.propTypes = propTypes;

export default ProjectBoardEpicDetailsDates;
