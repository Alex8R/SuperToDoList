import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
        "API-KEY": process.env.REACT_APP_API_TOKEN
    }
}

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    ...config
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
export type TaskType = {
    id: string
    todoListId: string
    title: string
    description: string | null
    status: TaskStatuses
    priority: TaskPriorities
    order: number
    addedDate: string
    startDate: string | null
    deadline: string | null
}
type GetTaskType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type TaskModelType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

const todolistAPI = {
    getTodoLists() {
        return API.get<Array<TodoListType>>("/todo-lists")
    },
    createTodoList(title: string) {
        return API.post<ResponseType<{item: TodoListType}>>("/todo-lists", { title })
    },
    deleteTodoList(id: string) {
        return API.delete<ResponseType>(`/todo-lists/${ id }`)
    },
    updateTodoList(id: string, title: string) {
        return API.put<ResponseType>(`/todo-lists/${ id }`, { title })
    },
    getTasks(todolistId: string) {
        return API.get<GetTaskType>(`/todo-lists/${ todolistId }/tasks`)
    },
    addTask(todolistId: string, taskTitle: string) {
        return API.post<ResponseType<{item: TaskType}>>(`/todo-lists/${ todolistId }/tasks`, { title: taskTitle })
    },
    deleteTask(taskId: string, todolistId: string) {
        return API.delete<ResponseType>(`/todo-lists/${ todolistId }/tasks/${ taskId }`)
    },
    updateTask(todolistId: string, taskId: string, model: TaskModelType) {
        return API.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }

}
export default todolistAPI;