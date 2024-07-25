import React, { Fragment, useRef, useState } from "react";
import PropTypes from "prop-types";

import { KeyCodes } from "../../../../shared/constants/keyCodes";
import { is, generateErrors } from "../../../../shared/utils/validation";

import { TitleTextarea, ErrorText } from "./Styles";

const propTypes = {
  epic: PropTypes.object.isRequired,
  updateEpic: PropTypes.func.isRequired
};

const ProjectBoardEpicDetailsTitle = ({ epic, updateEpic }) => {
  const $titleInputRef = useRef();
  const [error, setError] = useState(null);

  const handleTitleChange = () => {
    setError(null);

    const title = $titleInputRef.current.value;
    if (title === epic.title) return;

    const errors = generateErrors(
      { title },
      { title: [is.required(), is.maxLength(200)] }
    );

    if (errors.title) {
      setError(errors.title);
    } else {
      updateEpic({ title });
    }
  };

  return (
    <Fragment>
      <TitleTextarea
        minRows={1}
        placeholder="Short summary"
        defaultValue={epic.title}
        ref={$titleInputRef}
        onBlur={handleTitleChange}
        onKeyDown={event => {
          if (event.keyCode === KeyCodes.ENTER) {
            event.target.blur();
          }
        }}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Fragment>
  );
};

ProjectBoardEpicDetailsTitle.propTypes = propTypes;

export default ProjectBoardEpicDetailsTitle;
