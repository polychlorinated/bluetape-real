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

const ProjectBoardIssueDetailsComment = ({
  comment,
  fetchIssue,
  userId,
  role,
}) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [body, setBody] = useState(comment.body);

  const handleCommentDelete = async () => {
    try {
      await api.delete(`/comment/${comment.id}`);
      await fetchIssue();
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCommentUpdate = async () => {
    try {
      setUpdating(true);
      await api.put(`/comment/${comment.id}`, { body });

      await fetchIssue();
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
              <div style={{ display: 'flex' }}>
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
            {comment.file ? (
              comment.file.includes('video') ? (
                <div
                  style={{
                    width: '100%',

                    height: '100%',
                  }}
                >
                  <video
                    controls
                    // style={{ width: '100%', height: '100%' }}
                    style={{
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '20rem',
                      padding: '1rem',
                    }}
                    src={`${process.env.REACT_APP_API_URL}.com/files/${comment.file}`}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '100%',

                    height: '100%',
                  }}
                >
                  <img
                    src={`${process.env.REACT_APP_API_URL}.com/files/${comment.file}`}
                    style={{
                      height: '100%',
                      maxWidth: '100%',
                      maxHeight: '20rem',
                      padding: '1rem',
                    }}
                    alt="Some Picture"
                  />
                </div>
              )
            ) : (
              ''
            )}
          </Fragment>
        )}
      </Content>
    </Comment>
  );
};

ProjectBoardIssueDetailsComment.propTypes = propTypes;

const mapStateToProps = (state) => ({
  userId: state.auth.user.id,
});

export default connect(mapStateToProps)(ProjectBoardIssueDetailsComment);
