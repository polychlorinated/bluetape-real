const SET_PROJECT = "SET_PROJECT";
const SET_ISSUES = "SET_ISSUES";
const SET_ORG_PROJECTS = "SET_ORG_PROJECTS";

const initialState = {
  project: {},
  orgProjects: {}
};

export const setProject = payload => dispatch => {
  dispatch({
    type: SET_PROJECT,
    payload: payload
  });
};

export const setOrgProjects = payload => dispatch => {
  dispatch({
    type: SET_ORG_PROJECTS,
    payload: payload
  });
};

export const updateLocalIssues = payload => dispatch => {
  dispatch({
    type: SET_ISSUES,
    payload: payload
  });
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        project: action.payload
      };
    case SET_ISSUES:
      return {
        ...state,
        project: {
          ...state.project,
          issues: action.payload
        }
      };
    case SET_ORG_PROJECTS:
      return {
        ...state,
        orgProjects: action.payload
      };
    default:
      return state;
  }
};

export default projectReducer;
