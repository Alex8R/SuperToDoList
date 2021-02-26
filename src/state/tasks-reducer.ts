import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todo-lists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: "ADD_TASK"
    todolistId: string
    taskId: string
    title: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    todolistId: string
    taskId: string
    newTaskTitle: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    todolistId: string
    isDone: boolean
}

export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            const newTask: TaskType = { id: action.taskId, title: action.title, isDone: false };
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE_TASK_TITLE": {
            const stateCopy = { ...state }
            const task = stateCopy[action.todolistId].find(task => task.id === action.taskId)
            if (task) task.title = action.newTaskTitle;
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            const stateCopy = { ...state }
            const task = stateCopy[action.todolistId].find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }
            return stateCopy;
        }
        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.id]: [],
            }
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            return state
    }
};

const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({type: "REMOVE_TASK", todolistId, taskId});
const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({type: "ADD_TASK", taskId: v1(), todolistId, title});
const changeTaskTitleAC = (taskId: string, todolistId:string, newTaskTitle: string): ChangeTaskTitleActionType => ({type: "CHANGE_TASK_TITLE", todolistId, taskId, newTaskTitle});
const changeTaskStatusAC = (taskId: string, todolistId: string, isDone: boolean): ChangeTaskStatusActionType => ({type: "CHANGE_TASK_STATUS", taskId, todolistId, isDone});

export default tasksReducer;
export {removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC}