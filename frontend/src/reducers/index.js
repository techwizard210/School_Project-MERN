import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import taskReducer from "./taskReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  task: taskReducer
});