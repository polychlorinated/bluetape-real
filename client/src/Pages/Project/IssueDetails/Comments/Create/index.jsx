import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import api from '../../../../../shared/utils/api';
import useCurrentUser from '../../../../../shared/hooks/currentUser';
import toast from '../../../../../shared/utils/toast';

import BodyForm from '../BodyForm';
import ProTip from './ProTip';
import { Create, UserAvatar, Right, FakeTextarea } from './Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  fetchIssue: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetailsCommentsCreate = ({
  issueId,
  fetchIssue,
  role,
  type,
  review,
  setReview,
  ratings,
  setRatings,
  reviewBody,
  setReviewBody,
}) => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState('');
  const [files, setFiles] = useState({});

  const { currentUser } = useCurrentUser();
  const handleCommentCreate = async () => {
    try {
      console.log(files, 'file');
      setCreating(true);
      const comment = await api.post(`/comment`, {
        body,

        issueId,
        userId: currentUser.id,
        user: currentUser.id,
      });
      console.log(comment);
      if (files.file) {
        let url = `${process.env.REACT_APP_API_URL}.com/v1/comment/postImage/${comment.id}`;
        let fd = new FormData();
        fd.append('file', files.file);

        await axios.post(url, fd);
      }

      await fetchIssue();
      setFormOpen(false);
      setCreating(false);
      setFiles({});
      setBody('');
    } catch (error) {
      toast.error(error);
    }
  };
  const handleReviewCreate = async (e) => {
    try {
      setCreating(true);
      setReview(reviewBody);
      // await api.post(`/createReview`, {
      //   ...review,
      //   ratings,
      // });
      // await fetchIssue();
      // setFormOpen(false);
      setCreating(false);

      // setReview('');
    } catch (error) {
      toast.error(error);
    }
  };
  if (type === 'review') {
    return (
      <Create file={files} setFiles={setFiles}>
        {currentUser && (
          <UserAvatar
            name={currentUser.name}
            avatarUrl={currentUser.avatarUrl}
          />
        )}
        <Right>
          {isFormOpen ? (
            <React.Fragment>
              <BodyForm
                file={files}
                setFiles={setFiles}
                type={type}
                role={role}
                value={reviewBody}
                onChange={setReviewBody}
                isWorking={isCreating}
                onSubmit={handleReviewCreate}
                onCancel={() => setFormOpen(false)}
              />
            </React.Fragment>
          ) : (
            <Fragment>
              <FakeTextarea onClick={() => setFormOpen(true)}>
                Add a comment...
              </FakeTextarea>
              <ProTip setFormOpen={setFormOpen} />
            </Fragment>
          )}
        </Right>
      </Create>
    );
  }

  return (
    <Create>
      {currentUser && (
        <UserAvatar name={currentUser.name} avatarUrl={currentUser.avatarUrl} />
      )}
      <Right>
        {isFormOpen ? (
          <BodyForm
            create={true}
            file={files}
            setFiles={setFiles}
            role={role}
            value={body}
            onChange={setBody}
            isWorking={isCreating}
            onSubmit={handleCommentCreate}
            onCancel={() => setFormOpen(false)}
          />
        ) : (
          <Fragment>
            <FakeTextarea onClick={() => setFormOpen(true)}>
              Add a comment...
            </FakeTextarea>
            <ProTip setFormOpen={setFormOpen} />
          </Fragment>
        )}
      </Right>
    </Create>
  );
};

ProjectBoardIssueDetailsCommentsCreate.propTypes = propTypes;

export default ProjectBoardIssueDetailsCommentsCreate;
