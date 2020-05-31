import { GET_TASKS, DELETE_TASKS, GET_1TASK } from "../actions/types";

const initalState = {
    tasks: [],
    task: {},
};

export default function (state = initalState, action) {
    switch (action.type) {
        case GET_TASKS:
            return { ...state, tasks: action.payload };

        case DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };

        case GET_1TASK:
            return {
                ...state,
                task: action.payload,
            };

        default:
            return state;
    }
}
