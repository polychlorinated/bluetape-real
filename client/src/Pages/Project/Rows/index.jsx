import React from 'react';
import PropTypes from 'prop-types';
import Lists from '../Lists';
import Collapsible from 'react-collapsible';
import { IconStyler, Rows, Trigger, TriggerInner } from './Styles';
import { Icon } from '../../../shared/components';
import { connect } from 'react-redux';
import { setEpicUnderView } from '../../../redux/epic/epic-reducer';

const propTypes = {
  project: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  fetchProject: PropTypes.func.isRequired,
  issueCreateModalOpen: PropTypes.func.isRequired,
  page: PropTypes.string.isRequired,
  setEpicUnderView: PropTypes.func.isRequired,
  epicDetailsModalOpen: PropTypes.func.isRequired,
};

const ProjectBacklogEpics = ({
  project,
  filters,
  fetchProject,
  issueCreateModalOpen,
  page,
  setEpicUnderView,
  epicDetailsModalOpen,
}) => {
  let issues = project.epics.filter((el) => {
    return el.totalIssues !== 0;
  });
  let newProjects = { ...project, epics: issues };
  const TriggerRenderer = ({ epic, open }) => {
    return (
      <Trigger>
        <TriggerInner>
          <Icon type={open ? 'chevron-down' : 'chevron-right'} size={20} />
          <div style={{ margin: '2px 0 0 5px' }}>{epic.title}</div>
        </TriggerInner>
        <IconStyler>
          <Icon
            onClick={async (e) => {
              e.stopPropagation();
              await setEpicUnderView({ epic: epic.id, stage: page });
              epicDetailsModalOpen();
            }}
            type={'more'}
            size={22}
          />
        </IconStyler>
      </Trigger>
    );
  };

  return (
    <Rows>
      {newProjects.epics.map((epic) => {
        console.log(getIssuesForEpic(project, epic), 'imgggggggggggg');
        return (
          <Collapsible
            key={epic.key}
            transitionTime={200}
            open={true}
            trigger={<TriggerRenderer epic={epic} open={false} />}
            triggerWhenOpen={<TriggerRenderer epic={epic} open={true} />}
          >
            <Lists
              users={project.users}
              fetchProject={fetchProject}
              issues={getIssuesForEpic(project, epic)}
              filters={filters}
              issueCreateModalOpen={issueCreateModalOpen}
              page={page}
            />
          </Collapsible>
        );
      })}
    </Rows>
  );
};

const getIssuesForEpic = (project, epic) => {
  return project.issues.filter((issue) => issue.epicId === epic.id);
};

ProjectBacklogEpics.propTypes = propTypes;

const mapDispatchToProps = (dispatch) => ({
  setEpicUnderView: (epicId) => dispatch(setEpicUnderView(epicId)),
});

export default connect(null, mapDispatchToProps)(ProjectBacklogEpics);
