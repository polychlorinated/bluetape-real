import ScrollArea from "react-scrollbar-simple-rich";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Title } from "./Styles";
import { connect } from "react-redux";
import Issue from "./Issue";

const propTypes = {
  stage: PropTypes.string.isRequired,
  epic: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired
};

const scrollStyles = {
  width: "100%",
  maxHeight: 200,
  border: "1px solid #dfe1e6",
  padding: "5px",
  borderRadius: "5px"
};

const ProjectBoardEpicDetailsChildIssues = ({ epic, project, stage }) => {
  const getValidStatus = () => {
    if (stage === "backlog") {
      return ["planned", "unplanned"];
    }
    if (stage === "history") {
      return ["archived"];
    }
    return ["ready", "blocked", "inProgress", "inQa", "done"];
  };
  return (
    <Fragment>
      <Title>Child Issues</Title>
      <ScrollArea
        style={scrollStyles}
        speed={0.8}
        className="area"
        contentClassName="content"
        horizontal={false}
      >
        {project.issues.map((issue, index) => {
          if (
            issue.epicId === epic.id &&
            getValidStatus().includes(issue.status)
          ) {
            return (
              <Issue
                issue={issue}
                index={index}
                projectUsers={project.users}
                stage={stage}
              />
            );
          }
          return null;
        })}
      </ScrollArea>
    </Fragment>
  );
};

ProjectBoardEpicDetailsChildIssues.propTypes = propTypes;

const mapStateToProps = state => ({
  project: state.projectState.project
});

export default connect(mapStateToProps)(ProjectBoardEpicDetailsChildIssues);
