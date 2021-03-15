import { v1 } from "uuid";
import { TodoListType } from "../api/api";

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    id: string
    title: string
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

export type FilterValuesType =
    "all"
    | "completed"
    | "active"

export type TodolistDomainType =
    TodoListType
    & {
    filter: FilterValuesType
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
            const newTodolist: TodolistDomainType = {
                id: action.id,
                title: action.title,
                filter: "all",
                addedDate: "",
                order: 0
            }
            return [ ...state, newTodolist ];
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl);
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);
        }
        default:
            return state
    }
};

const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({ type: "REMOVE_TODOLIST", id: todolistId });
const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => ({ type: "ADD_TODOLIST", title: newTodolistTitle, id: v1() });
const changeTodolistTitleAC = (newTodolistTitle: string, todolistID: string): ChangeTodolistTitleActionType => ({ type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle });
const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID: string): ChangeTodolistFilterActionType => ({ type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter });

export default todolistsReducer;
export { removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC }