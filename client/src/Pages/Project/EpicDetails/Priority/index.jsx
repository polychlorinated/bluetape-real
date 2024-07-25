import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  EpicPriority,
  EpicPriorityCopy
} from "../../../../shared/constants/epics";
import { Select, IssuePriorityIcon } from "../../../../shared/components";

import { SectionTitle } from "../Styles";
import { Priority, Label } from "./Styles";

const propTypes = {
  epic: PropTypes.object.isRequired,
  updateEpic: PropTypes.func.isRequired
};

const ProjectBoardEpicDetailsPriority = ({ epic, updateEpic }) => (
  <Fragment>
    <SectionTitle>Priority</SectionTitle>
    <Select
      variant="empty"
      withClearValue={false}
      dropdownWidth={343}
      name="priority"
      value={epic.priority}
      options={Object.values(EpicPriority).map(priority => ({
        value: priority,
        label: EpicPriorityCopy[priority]
      }))}
      onChange={priority => updateEpic({ priority })}
      renderValue={({ value: priority }) => renderPriorityItem(priority, true)}
      renderOption={({ value: priority }) => renderPriorityItem(priority)}
    />
  </Fragment>
);

const renderPriorityItem = (priority, isValue) => (
  <Priority isValue={isValue}>
    <IssuePriorityIcon priority={priority} />
    <Label>{EpicPriorityCopy[priority]}</Label>
  </Priority>
);

ProjectBoardEpicDetailsPriority.propTypes = propTypes;

export default ProjectBoardEpicDetailsPriority;
