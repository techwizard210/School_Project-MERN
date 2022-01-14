import {
    CREATE_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    GET_TASKS
  } from "../actions/types";
  const isEmpty = require("is-empty");
  const initialState = {
    tasks: [],
    task: []
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case CREATE_TASK:
        return {
          ...state,
          tasks:[action.payload, ...state.tasks]
        };
      case UPDATE_TASK:
        console.log(action.payload);
        let index = state.tasks.findIndex(
            task => task._id === action.payload._id
        );

        state.tasks.splice(index, 1);

        return {
          ...state,
          tasks: [action.payload, ...state.tasks]
        };
      case GET_TASKS:
          console.log(action.payload);
        return {
            ...state,
            tasks:action.payload
        }
      case DELETE_TASK:
        return {
            ...state,
            tasks:action.payload
        }
      default:
        return state;
    }
  }

  