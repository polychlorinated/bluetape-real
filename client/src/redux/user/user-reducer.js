const SET_USER = "SET_USER";
const TOGGLE_INVITE_INPUT_VISIBILITY = "TOGGLE_INVITE_INPUT_VISIBILITY";

const initialState = {
  user: {},
  inviteInputVisible: true
};

export const setUser = payload => dispatch => {
  dispatch({
    type: SET_USER,
    payload: payload
  });
};

export const toggleInviteInputVisibility = payload => dispatch => {
  dispatch({
    type: TOGGLE_INVITE_INPUT_VISIBILITY,
    payload: payload
  });
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case TOGGLE_INVITE_INPUT_VISIBILITY:
      return {
        ...state,
        inviteInputVisible: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
