import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import api from '../../../shared/utils/api';
import useApi from '../../../shared/hooks/api';
import { PageError, Button } from '../../../shared/components';

import Loader from './Loader';
import Type from './Type';
import Delete from './Delete';
import Title from './Title';
import Description from './Description';
import Comments from './Comments';
import Priority from './Priority';
import Dates from './Dates';
import {
  TopActions,
  TopActionsRight,
  Content,
  Left,
  Right,
  Container,
} from './Styles';
import { connect } from 'react-redux';
import IssuesCount from './IssuesCount';
import ChildIssues from './ChildIssues';

const propTypes = {
  epic: PropTypes.string.isRequired,
  projectUsers: PropTypes.array.isRequired,
  fetchProject: PropTypes.func.isRequired,
  modalClose: PropTypes.func.isRequired,
};

const ProjectBoardEpicDetails = ({
  epic,
  fetchProject,
  modalClose,
  user,
  projectLead,
}) => {
  const [{ data, error }, fetchEpic] = useApi.get(`/epic/manage/${epic.epic}`);

  if (!data) return <Loader />;
  if (error) return <PageError />;

  const updateEpic = async (updatedFields) => {
    await api.optimisticUpdate(`/epic/manage/${epic.epic}`, updatedFields);
    await fetchEpic();
    await fetchProject();
  };
  console.log(data);
  return (
    <React.Fragment>
      <TopActions>
        <Type epic={data} />
        <TopActionsRight>
          {((user.role === 'owner' && !user.isHalfOwner) ||
            user.id === projectLead.id) && (
            <Delete
              epic={data}
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
          <Title epic={data} updateEpic={updateEpic} />

          <ChildIssues epic={data} stage={epic.stage} />
          <Comments epic={data} fetchEpic={fetchEpic} />
        </Left>
        <Right>
          <Priority epic={data} updateEpic={updateEpic} />
          <IssuesCount epic={data} />
          <Dates epic={data} />{' '}
          <div style={{ padding: '.5rem' }}>
            Location:{' '}
            <span style={{ marginLeft: 'auto', paddingLeft: '.5rem' }}>
              {data.location}
            </span>
          </div>
        </Right>
      </Content>
    </React.Fragment>
  );
};

ProjectBoardEpicDetails.propTypes = propTypes;
const mapStateToProps = (state) => ({
  user: state.userState.user,
  projectLead: state.projectState.project.projectLead,
});

export default connect(mapStateToProps)(ProjectBoardEpicDetails);
