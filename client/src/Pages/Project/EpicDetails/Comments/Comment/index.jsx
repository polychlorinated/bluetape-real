import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../../../../shared/utils/api';
import toast from '../../../../../shared/utils/toast';
import { formatDateTimeConversational } from '../../../../../shared/utils/dateTime';
import { ConfirmModal } from '../../../../../shared/components';

import BodyForm from '../BodyForm';
import {
  Comment,
  UserAvatar,
  Content,
  Username,
  CreatedAt,
  Body,
  EditLink,
  DeleteLink,
} from './Styles';
import { connect } from 'react-redux';

const propTypes = {
  comment: PropTypes.object.isRequired,
  fetchIssue: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const ProjectBoardEpicDetailsComment = ({ comment, fetchEpic, userId }) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleCommentDelete = async () => {
    try {
      await api.delete(`/comment/${comment.id}`);
      await fetchEpic();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      await api.put(`/comment/${comment.id}`, { body });
      await fetchEpic();
      setUpdating(false);
      setFormOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Comment data-testid="issue-comment">
      <UserAvatar name={comment.user.name} avatarUrl={comment.user.avatarUrl} />
      <Content>
        <Username>{comment.user.name}</Username>
        <CreatedAt>{formatDateTimeConversational(comment.createdAt)}</CreatedAt>

        {isFormOpen ? (
          <BodyForm
            value={body}
            onChange={setBody}
            isWorking={isUpdating}
            onSubmit={handleCommentUpdate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <Body>{comment.body}</Body>
            {userId === comment.userId && (
              <div className="abdef" style={{ display: 'flex' }}>
                <EditLink onClick={() => setFormOpen(true)}>Edit</EditLink>
                <ConfirmModal
                  title="Are you sure you want to delete this comment?"
                  message="Once you delete, it's gone for good."
                  confirmText="Delete comment"
                  onConfirm={handleCommentDelete}
                  renderLink={(modal) => (
                    <DeleteLink onClick={modal.open}>Delete</DeleteLink>
                  )}
                />
              </div>
            )}
          </Fragment>
        )}
      </Content>
    </Comment>
  );
};

ProjectBoardEpicDetailsComment.propTypes = propTypes;

const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
});

export default connect(mapStateToProps)(ProjectBoardEpicDetailsComment);
