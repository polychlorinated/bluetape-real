import { combineReducers } from "redux";
import userReducer from "./user/user-reducer";
import projectReducer from "./project/project-reducer";
import epicReducer from "./epic/epic-reducer";
import socketReducer from "./socket/socket-reducer";

const rootReducer = combineReducers({
  userState: userReducer,
  projectState: projectReducer,
  epicState: epicReducer,
  socketState: socketReducer,
});

export default rootReducer;
