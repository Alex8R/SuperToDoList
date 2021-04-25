import todolistAPI, { TaskModelType, TaskStatuses, TaskType } from "../../api/api";
import { Dispatch } from "redux";
import { AppRootStateType } from "../store";
import * as actions from "./actions"
import {TodoListActionsType} from "../todolist/todolists-reducer";

type InferActionsType<T> = T extends { [key: string]: infer U} ? U : never
type TaskActionsType = ReturnType<InferActionsType<typeof actions>> | TodoListActionsType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            return {
                ...state,
                [action.task.todoListId]: [ action.task, ...state[action.task.todoListId] ]
            }
        }
        case "CHANGE_TASK_TITLE": {
            const stateCopy = { ...state }
            stateCopy[action.task.todoListId] = stateCopy[action.task.todoListId]
                .map(t => t.id === action.task.id
                    ? { ...t, title: action.task.title }
                    : t)
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            const stateCopy = { ...state }
            stateCopy[action.task.todoListId] = stateCopy[action.task.todoListId]
                .map(t => t.id === action.task.id
                    ? { ...t, status: action.task.status }
                    : t);
            return stateCopy;
        }
        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.todoList.id]: [],
            }
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = { ...state }
            delete stateCopy[action.id]
            return stateCopy
        }
        case "SET_TODOLISTS": {
            const stateCopy = { ...state }
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })

            return stateCopy
        }
        case "SET_TASKS": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy
        }
        default:
            return state
    }
};


const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .getTasks(todolistId)
            .then(r => dispatch(actions.setTasksAC(r.data.items, todolistId)))
    }
}
const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .deleteTask(taskId, todolistId)
            .then(r => dispatch(actions.removeTaskAC(taskId, todolistId)))
    }
}
const addTaskTC = (taskTitle: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .addTask(todoListId, taskTitle)
            .then(({ data: { data: { item } } }) => dispatch(actions.addTaskAC(item)))

    }
}
const changeTaskTitleTC = (taskId: string, todolistId: string, newTaskTitle: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: TaskModelType = {
                title: newTaskTitle,
                priority: task.priority,
                status: task.status,
                deadline: task.deadline,
                startDate: task.startDate,
                description: task.description
            }
            todolistAPI
                .updateTask(todolistId, taskId, model)
                .then(({ data: { data: { item } } }) => dispatch(actions.changeTaskTitleAC(item)))
        }


    }
}
const changeTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: TaskModelType = {
                title: task.title,
                priority: task.priority,
                status: status,
                deadline: task.deadline,
                startDate: task.startDate,
                description: task.description
            }
            todolistAPI
                .updateTask(todolistId, taskId, model)
                .then(({ data: { data: { item } } }) => dispatch(actions.changeTaskStatusAC(item)))
        }


    }
}

export default tasksReducer;
export {
    fetchTasksTC,
    removeTaskTC,
    addTaskTC,
    changeTaskTitleTC,
    changeTaskStatusTC
}