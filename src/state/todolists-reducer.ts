import { v1 } from "uuid";
import todolistAPI, { TodoListType } from "../api/api";
import { Dispatch } from "redux";

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    todoList: TodoListType
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    id: string
    title: string
}

type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    id: string
    filter: FilterValuesType
}

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsAT

export type FilterValuesType =
    "all"
    | "completed"
    | "active"

export type TodolistDomainType =
    TodoListType
    & {
    filter: FilterValuesType
}
export type SetTodolistsAT = {
    type: "SET_TODOLISTS"
    todolists: Array<TodoListType>
}
export const todoListId1 = v1();
export const todoListId2 = v1();

const initialState: Array<TodolistDomainType> = []

const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD_TODOLIST": {
            const todoList: TodolistDomainType = {...action.todoList, filter: "all"}
            return [ ...state, todoList ];
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl);
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);
        }
        case "SET_TODOLISTS": {
            return action.todolists.map(tl => ({...tl, filter: "all"}))
        }
        default:
            return state
    }
};

const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: "REMOVE_TODOLIST", id: todolistId });
const addTodolistAC = (todoList: TodoListType): AddTodolistActionType => ({ type: "ADD_TODOLIST", todoList});
const changeTodolistTitleAC = (newTodolistTitle: string, todolistID: string): ChangeTodolistTitleActionType => ({ type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle });
const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => ({ type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter });
const setTodolistsAC = (todolists: Array<TodoListType>): SetTodolistsAT => ({ type: "SET_TODOLISTS", todolists });

const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .getTodoLists()
            .then(r => dispatch(setTodolistsAC(r.data)))
    }
}
const removeTodoListTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .deleteTodoList(id)
            .then(r => dispatch(removeTodolistAC(id)))
    }
}
const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .createTodoList(title)
            .then(({ data: { data: { item } } }) => dispatch(addTodolistAC(item)))
    }
}
const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .updateTodoList(id, title)
            .then(r => dispatch(changeTodolistTitleAC(title, id)))
    }
}

export default todolistsReducer;
export {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    fetchTodolistsTC,
    removeTodoListTC,
    addTodoListTC,
    changeTodolistTitleTC
}
