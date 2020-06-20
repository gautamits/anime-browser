import { ReducerAction, Dispatch } from "react";
import { Action } from "redux";

interface Action2 extends Action {
  payload: any;
  data?: Object;
}

export default (state = {}, action: Action2) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...state,
        loadingUrl: process.env.REACT_APP_BASE_URL+action.payload.request.url,
        loading: true,
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        loadingUrl: '',
        ...action.payload.data,
      };
    case "FAILURE":
      return {
        ...state,
        loadingUrl: '',
        loading: false,
      };
    default:
      return state;
  }
};

export function loadAnime(name: string, limit: number, page: number) {
  return {
    types: ["REQUEST", "SUCCESS", "FAILURE"],
    payload: {
      request: {
        url: `${name}&limit=${limit}&page=${page}`,
      },
    },
  };
}
