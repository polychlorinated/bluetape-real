import React from "react";
import PropTypes from "prop-types";
import { StyledLogo } from "./Styles";

const propTypes = {
  className: PropTypes.string,
  size: PropTypes.number
};

const defaultProps = {
  size: 40
};

const Logo = ({ size }) => <StyledLogo size={size} />;

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;

export default Logo;
