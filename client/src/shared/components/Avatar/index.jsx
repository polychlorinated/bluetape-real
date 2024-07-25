import React from "react";
import PropTypes from "prop-types";

import { Image, Letter } from "./Styles";
import { colors } from "../../utils/colors";

const propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number
};

const defaultProps = {
  className: undefined,
  avatarUrl: null,
  name: "",
  size: 32
};

const Avatar = ({ className, avatarUrl, name, size, ...otherProps }) => {
  const sharedProps = {
    className,
    size,
    "data-testid": name ? `avatar:${name}` : "avatar",
    ...otherProps
  };

  if (avatarUrl) {
    return <Image avatarUrl={avatarUrl} {...sharedProps} />;
  }

  return (
    <Letter color={getColorFromName(name)} {...sharedProps}>
      <span>{name.slice(0, 2)}</span>
    </Letter>
  );
};

const getColorFromName = name =>
  colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length];

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
