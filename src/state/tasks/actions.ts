import {TaskType} from "../../api/api";

export const removeTaskAC = (taskId: string, todolistId: string) => ({ type: "REMOVE_TASK", todolistId, taskId } as const);
export const addTaskAC = (task: TaskType) => ({ type: "ADD_TASK", task } as const);
export const changeTaskTitleAC = (task: TaskType) => ({ type: "CHANGE_TASK_TITLE", task } as const);
export const changeTaskStatusAC = (task: TaskType) => ({ type: "CHANGE_TASK_STATUS", task } as const);
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => ({ type: "SET_TASKS", tasks, todolistId } as const)
