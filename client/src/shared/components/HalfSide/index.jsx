import React from 'react';
import { HalfSide } from './Styles';
import PropTypes from 'prop-types';

const propTypes = {
  variant: PropTypes.oneOf(['left', 'right']),
};

function HalfScreen({ variant, children }) {
  return <HalfSide variant={variant}>{children}</HalfSide>;
}

HalfScreen.propTypes = propTypes;

export default HalfScreen;
