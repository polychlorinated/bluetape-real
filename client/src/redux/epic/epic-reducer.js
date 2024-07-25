const SET_EPIC_UNDER_VIEW = "SET_EPIC_UNDER_VIEW";

const initialState = {
  epicUnderView: {}
};

export const setEpicUnderView = payload => dispatch => {
  dispatch({
    type: SET_EPIC_UNDER_VIEW,
    payload: payload
  });
};

const epicReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EPIC_UNDER_VIEW:
      return {
        ...state,
        epicUnderView: action.payload
      };
    default:
      return state;
  }
};

export default epicReducer;
