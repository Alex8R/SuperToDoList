import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT } from "./todolists-reducer";
import todolistAPI, { TaskPriorities, TaskStatuses, TaskType } from "../api/api";
import { Dispatch } from "redux";

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
    status: TaskStatuses
}
export type SetTaskAT = {
    type: "SET_TASKS"
    tasks: Array<TaskType>
    todolistId: string
}
export type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsAT
    | SetTaskAT

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
const initialState: TasksStateType = {}

const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(t => t.id !== action.taskId)
            return stateCopy;
        }
        case "ADD_TASK": {
            const newTask: TaskType = {
                id: action.taskId,
                todoListId: action.todolistId,
                title: action.title,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                order: 0,
                addedDate: "",
                startDate: "",
                deadline: ""
            };
            return {
                ...state,
                [action.todolistId]: [ newTask, ...state[action.todolistId] ]
            }
        }
        case "CHANGE_TASK_TITLE": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId]
                .map(t => t.id === action.taskId
                    ? { ...t, title: action.newTaskTitle }
                    : t)
            return stateCopy
        }
        case "CHANGE_TASK_STATUS": {
            const stateCopy = { ...state }
            stateCopy[action.todolistId] = stateCopy[action.todolistId]
                .map(t => t.id === action.taskId
                    ? { ...t, status: action.status }
                    : t);
            return stateCopy;
        }
        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.id]: [],
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

const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({ type: "REMOVE_TASK", todolistId, taskId });
const addTaskAC = (title: string, todolistId: string): AddTaskActionType => ({ type: "ADD_TASK", taskId: v1(), todolistId, title });
const changeTaskTitleAC = (taskId: string, todolistId: string, newTaskTitle: string): ChangeTaskTitleActionType => ({ type: "CHANGE_TASK_TITLE", todolistId, taskId, newTaskTitle });
const changeTaskStatusAC = (taskId: string, todolistId: string, status: TaskStatuses): ChangeTaskStatusActionType => ({ type: "CHANGE_TASK_STATUS", taskId, todolistId, status });
const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTaskAT => ({ type: "SET_TASKS", tasks, todolistId })

const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .getTasks(todolistId)
            .then(r => dispatch(setTasksAC(r.data.items, todolistId)))
    }
}

export default tasksReducer;
export {
    removeTaskAC,
    addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    setTasksAC,
    fetchTasksTC
}