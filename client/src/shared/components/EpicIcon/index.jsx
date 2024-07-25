import React from "react";
import PropTypes from "prop-types";

import { TypeIcon } from "./Styles";

const propTypes = {
  type: PropTypes.string.isRequired
};

const EpicTypeIcon = ({ type, color, ...otherProps }) => (
  <TypeIcon type={type} color={color} size={18} {...otherProps} />
);

EpicTypeIcon.propTypes = propTypes;

export default EpicTypeIcon;
