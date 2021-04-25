import {TodoListType} from "../../api/api";
import {FilterValuesType} from "./todolists-reducer";


export const removeTodolistAC = (todolistId: string) => ({ type: "REMOVE_TODOLIST", id: todolistId } as const)
export const addTodolistAC = (todoList: TodoListType) => ({ type: "ADD_TODOLIST", todoList} as const)
export const changeTodolistTitleAC = (newTodolistTitle: string, todolistID: string) =>
        ({ type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle } as const)
export const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID: string) =>
        ({ type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter } as const)
export const setTodolistsAC = (todolists: Array<TodoListType>) => ({ type: "SET_TODOLISTS", todolists } as const)