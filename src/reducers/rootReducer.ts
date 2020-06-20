import { combineReducers } from "redux";
import simpleReducer from "./simpleReducer";
import animeReducer from './animeReducer';

export default combineReducers({
  simpleReducer,
  animeReducer
});
