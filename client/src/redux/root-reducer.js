import { combineReducers } from "redux";
import userReducer from './user/user-reducer';
import projectReducer from "./project/project-reducer";
import epicReducer from "./epic/epic-reducer";

const rootReducer = combineReducers({
  auth: userReducer,
  project: projectReducer,
  epic: epicReducer,
});

export default rootReducer;