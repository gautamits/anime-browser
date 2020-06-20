import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import rootReducer from "./reducers/rootReducer";

const client = axios.create({
  //all axios can be used, shown in axios documentation
  baseURL: process.env.REACT_APP_BASE_URL,
  responseType: "json",
});


export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, axiosMiddleware(client))
  );
}
