import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { getTextContentsFromHtmlString } from '../../../../shared/utils/browser';
import {
  TextEditor,
  TextEditedContent,
  Button,
} from '../../../../shared/components';

import { Title, EmptyLabel, Actions } from './Styles';

const propTypes = {
  epic: PropTypes.object.isRequired,
  updateEpic: PropTypes.func.isRequired,
};

const ProjectBoardEpicDetailsDescription = ({ epic, updateEpic }) => {
  const [description, setDescription] = useState(epic.description);
  const [isEditing, setEditing] = useState(false);

  const handleUpdate = () => {
    setEditing(false);
    updateEpic({ description });
  };

  const isDescriptionEmpty =
    getTextContentsFromHtmlString(description).trim().length === 0;

  return (
    <Fragment>
      <Title>Description</Title>
      {isEditing ? (
        <Fragment>
          <TextEditor
            placeholder="Describe the epic"
            defaultValue={getTextContentsFromHtmlString(description)}
            onChange={setDescription}
          />
          <Actions>
            <Button variant="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button variant="empty" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </Actions>
        </Fragment>
      ) : (
        <Fragment>
          {isDescriptionEmpty ? (
            <EmptyLabel onClick={() => setEditing(true)}>
              Add a description...
            </EmptyLabel>
          ) : (
            <TextEditedContent
              content={getTextContentsFromHtmlString(description)}
              onClick={() => setEditing(true)}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

ProjectBoardEpicDetailsDescription.propTypes = propTypes;

export default ProjectBoardEpicDetailsDescription;
