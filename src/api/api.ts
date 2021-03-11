import axios from "axios";

const config = {
    withCredentials: true,
    headers: {
        "API-KEY": process.env.REACT_APP_API_TOKEN
    }
}

const API = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    ...config
})

type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TaskType = {
    id: string
    title: string
    description: string | null
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
    addedDate: string
}
type GetTaskType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
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
        return API.post<ResponseType>("/todo-lists", { title })
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
        return API.post(`/todo-lists/${ todolistId }/tasks`, {title: taskTitle})
    },
    deleteTask(todolistId: string, taskId: string) {
        return API.delete<ResponseType>(`/todo-lists/${ todolistId }/tasks/${ taskId }`)
    }

}
export default todolistAPI;