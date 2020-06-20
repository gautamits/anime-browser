import { ReducerAction, Dispatch } from "react";
import { Action } from "redux";


interface Action2 extends Action{
  payload: any;
}
export default (state = {}, action:Action2) => {
  switch (action.type) {
    case "SIMPLE_ACTION":
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};

export const simpleAction = () => {
  return {
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action",
  }
};
