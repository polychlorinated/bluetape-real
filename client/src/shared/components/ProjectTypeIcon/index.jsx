import React from "react";
import PropTypes from "prop-types";

import { TypeIcon } from "./Styles";

const propTypes = {
  type: PropTypes.string.isRequired
};

const ProjectTypeIcon = ({ type, ...otherProps }) => (
  <TypeIcon type={type} color={type} size={18} {...otherProps} />
);

ProjectTypeIcon.propTypes = propTypes;

export default ProjectTypeIcon;
