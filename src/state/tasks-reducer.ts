import { AddTodolistActionType, RemoveTodolistActionType, SetTodolistsAT } from "./todolists-reducer";
import todolistAPI, { TaskModelType, TaskPriorities, TaskStatuses, TaskType } from "../api/api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./store";

export type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD_TASK"
    task: TaskType
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE_TASK_TITLE"
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE_TASK_STATUS"
    task: TaskType
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

const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => ({ type: "REMOVE_TASK", todolistId, taskId });
const addTaskAC = (task: TaskType): AddTaskActionType => ({ type: "ADD_TASK", task });
const changeTaskTitleAC = (task: TaskType): ChangeTaskTitleActionType => ({ type: "CHANGE_TASK_TITLE", task });
const changeTaskStatusAC = (task: TaskType): ChangeTaskStatusActionType => ({ type: "CHANGE_TASK_STATUS", task });
const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTaskAT => ({ type: "SET_TASKS", tasks, todolistId })

const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .getTasks(todolistId)
            .then(r => dispatch(setTasksAC(r.data.items, todolistId)))
    }
}
const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .deleteTask(taskId, todolistId)
            .then(r => dispatch(removeTaskAC(taskId, todolistId)))
    }
}
const addTaskTC = (taskTitle: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .addTask(todoListId, taskTitle)
            .then(({ data: { data: { item } } }) => dispatch(addTaskAC(item)))

    }
}
const changeTaskTitleTC = (taskId: string, todolistId: string, newTaskTitle: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(task) {
            const model: TaskModelType = {
                title: newTaskTitle,
                priority: task.priority,
                status: task.status,
                // @ts-ignore
                deadline: task.deadline,
                // @ts-ignore
                startDate: task.startDate,
                // @ts-ignore
                description: task.description
            }
            todolistAPI
                .updateTask(todolistId, taskId, model)
                .then(({data: {data: {item}}}) => dispatch(changeTaskTitleAC(item)))
        }


    }
}
const changeTaskStatusTC = (taskId: string, todolistId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(task) {
            const model: TaskModelType = {
                title: task.title,
                priority: task.priority,
                status: status,
                // @ts-ignore
                deadline: task.deadline,
                // @ts-ignore
                startDate: task.startDate,
                // @ts-ignore
                description: task.description
            }
            todolistAPI
                .updateTask(todolistId, taskId, model)
                .then(({data: {data: {item}}}) => dispatch(changeTaskStatusAC(item)))
        }


    }
}

export default tasksReducer;
export {
    removeTaskAC,
    addTaskAC,
    changeTaskTitleAC,
    changeTaskStatusAC,
    setTasksAC,
    fetchTasksTC,
    removeTaskTC,
    addTaskTC,
    changeTaskTitleTC,
    changeTaskStatusTC
}