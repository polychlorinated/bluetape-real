import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../../shared/utils/api';
import useApi from '../../../shared/hooks/api';
import { PageError, Button } from '../../../shared/components';
import toast from '../../../shared/utils/toast';
// import Comment from './Comment';

import Loader from './Loader';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Status from './Status';
import AssigneesReporter from './AssigneesReporter';
import Priority from './Priority';
import EstimateTracking from './EstimateTracking';
import Dates from './Dates';
import Create from './Comments/Create';
import {
  TopActions,
  TopActionsRight,
  Content,
  Left,
  Right,
  Image,
  ReviewContainer,
  Reviewed,
  RatingsContainer,
} from './Styles';
import { connect } from 'react-redux';
import Ratings from '../Ratings';
import axios from 'axios';
import { Divider } from '../../../shared/components/Breadcrumbs/Styles';

const propTypes = {
  issueId: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardIssueDetails = ({
  issueId,
  projectUsers,
  fetchProject,
  modalClose,
  page,
  user,
  projectLead,
}) => {
  const [ratings, setRatings] = useState();
  const [review, setReview] = useState();
  const [body, setBody] = useState('');
  const [{ data, error }, fetchIssue] = useApi.get(`/issue/${issueId}`);
  if (!data) return <Loader />;
  if (error) return <PageError />;

  const issue = data;

  const updateIssue = async (updatedFields) => {
    await api.optimisticUpdate(`/issue/${issueId}`, updatedFields);
    await fetchIssue();
    await fetchProject();
  };
  const createReview = async () => {
    console.log(ratings, body);
    if (!body) {
      toast.error('No review provided!');
      return;
    }
    const sData = {
      issueId,
      body: body,
    };
    await axios.post(
      `${process.env.REACT_APP_API_URL}/issue/createReview`,
      sData
    );
    await fetchIssue();
    await fetchProject();
  };
  let roleAuthrized =
    (user.role === 'owner' && !user.isHalfOwner) || user.id === projectLead.id;

  return (
    <Fragment>
      <TopActions>
        <TopActionsRight>
          {((user.role === 'owner' && !user.isHalfOwner) ||
            user.id === projectLead.id) && (
            <Delete
              issue={issue}
              fetchProject={fetchProject}
              modalClose={modalClose}
            />
          )}

          <Button
            icon="close"
            iconSize={24}
            variant="empty"
            onClick={modalClose}
          />
        </TopActionsRight>
      </TopActions>
      <Content>
        <Left>
          <Title issue={issue} updateIssue={updateIssue} />
          {console.log(issue)}
          {issue.file ? (
            issue.file.includes('video') ? (
              <div style={{ maxWidth: '100%', maxHeight: '100%' }}>
                <video
                  controls
                  style={{ width: '100%', height: '100%' }}
                  src={`${process.env.REACT_APP_API_URL}/files/${issue.file}`}
                />
              </div>
            ) : (
              <Image
                src={`${process.env.REACT_APP_API_URL}/files/${issue.file}`}
                alt="Some Picture"
                issue={issue}
                updateIssue={updateIssue}
              />
            )
          ) : (
            ''
          )}

          <Description issue={issue} updateIssue={updateIssue} />
          <Comments role={user.role} issue={issue} fetchIssue={fetchIssue} />
        </Left>
        <Right>
          <Status issue={issue} updateIssue={updateIssue} page={page} />
          <AssigneesReporter
            issue={issue}
            updateIssue={updateIssue}
            projectUsers={projectUsers}
          />
          <Priority issue={issue} updateIssue={updateIssue} />
          <EstimateTracking issue={issue} updateIssue={updateIssue} />
          <Divider />
          <div style={{ padding: '.5rem' }}>
            {`Deadline: `}
            <input
              type="date"
              value={issue.deadline}
              onChange={(e) => {
                console.log(e.target.value);
                updateIssue({ deadline: e.target.value });
              }}
            ></input>
          </div>
          <div style={{ padding: '.5rem' }}>
            {`Location: `}
            <input type="text" value={issue.location}></input>
          </div>
          <Dates issue={issue} />
          <Divider />
          {!issue.review ? (
            (user.role === 'owner' && !user.isHalfOwner) ||
            user.id === projectLead.id ? (
              <ReviewContainer>
                <span>Review: </span>

                <Create
                  type="review"
                  issueId={issue.id}
                  reviewBody={body}
                  setReviewBody={setBody}
                  setReview={setReview}
                  setRatings={setRatings}
                  ratings={ratings}
                  review={review}
                  fetchIssue={fetchIssue}
                />

                <Button onClick={createReview}>Submit</Button>
              </ReviewContainer>
            ) : (
              <span>Not Rated Yet!</span>
            )
          ) : (
            <Reviewed>
              <div>
                <b>
                  {' '}
                  <span style={{ fontSize: '1.1rem' }}>Review: </span>{' '}
                </b>
                <i style={{ color: '#0b875b' }}> {issue.review.body} </i>
              </div>
            </Reviewed>
          )}
        </Right>
      </Content>
    </Fragment>
  );
};

ProjectBoardIssueDetails.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.auth.user,
  projectLead: state.project.project.projectLead,
});

export default connect(mapStateToProps)(ProjectBoardIssueDetails);
