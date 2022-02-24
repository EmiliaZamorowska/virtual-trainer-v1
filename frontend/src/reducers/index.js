import { combineReducers } from "redux";
import exercises from './exercises';
import auth from './auth';

export default combineReducers({ exercises, auth })