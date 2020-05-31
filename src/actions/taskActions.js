import axios from "axios";
import { GET_ERRORS, GET_TASKS, DELETE_TASKS, GET_1TASK } from "./types";

export const addTask = (task, history) => async (dispatch) => {
    try {
        await axios.post("http://localhost:8080/api/board", task);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {},
        });
    } catch (error) {
        if (error.response) {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data,
            });
        }
    }
};

export const getBacklog = () => async (dispatch) => {
    const res = await axios.get("http://localhost:8080/api/board/all");
    dispatch({
        type: GET_TASKS,
        payload: res.data,
    });
};

export const deleteTask = (task_id) => async (dispatch) => {
    if (window.confirm(`You are deleting task ${task_id}.`)) {
        await axios.delete(`http://localhost:8080/api/board/${task_id}`);
        dispatch({
            type: DELETE_TASKS,
            payload: task_id,
        });
    } else {
    }
};

export const getTask = (task_id, history) => async (dispatch) => {
    try {
        const res = await axios.get(
            `http://localhost:8080/api/board/${task_id}`
        );
        dispatch({
            type: GET_1TASK,
            payload: res.data,
        });
    } catch (error) {
        history.push("/");
    }
};
