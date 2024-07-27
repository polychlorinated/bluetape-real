import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import projectReducer from "./project/project-reducer";
import epicReducer from "./epic/epic-reducer";
//import socketReducer from "./socket/socket-reducer";
import authReducer from './auth/auth-reducer';
import projectReducer from './project/project-reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  userState: userReducer,
  projectState: projectReducer,
  epicState: epicReducer,
  //socketState: socketReducer,
});

export default rootReducer;
