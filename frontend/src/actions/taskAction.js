import axios from "axios";
import setAuthToken from "../actions/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_TASKS
} from "./types";
// Create Task
export const createTask = taskData => dispatch => {
  axios
    .post("/api/users/addtask/", taskData)
    .then(res => 
        dispatch({
            type: CREATE_TASK,
            payload: res.data
        }))
    .catch(err =>console.log(err));
};

export const getTasks = () => dispatch => {
    axios
        .get('/api/users/task')
        .then(res =>
            dispatch({
                type:GET_TASKS,
                payload: res.data
            }))
        .catch(err => console.log(err));
        
};

export const deleteTask = (id) => dispatch => {
    axios
        .delete('/api/users/delete-task/' + id)
        .then(res => 
            dispatch({
                type: DELETE_TASK,
                payload: res.data
            }))
        .catch(err => console.log(err));
};

export const updateTask = (id, task) => dispatch => {
    axios
        .post("/api/users/updatetask/" + id, task, {})
        .then(res =>
            dispatch({
                type: UPDATE_TASK,
                payload: res.data
            }))
        .catch(err => console.log(err));
}

