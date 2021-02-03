import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

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
    | ChangeTodolistFilterActionType;

const todoListsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD_TODOLIST": {
            const newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist];
        }
        case "CHANGE_TODOLIST_TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) todolist.title = action.title;
            return [...state];
        }
        case "CHANGE_TODOLIST_FILTER": {
            const todoList = state.find(tl => tl.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state
    }
};

const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({type: "REMOVE_TODOLIST", id: todolistId});
const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => ({type: "ADD_TODOLIST", title: newTodolistTitle, id: v1()});
const changeTodolistTitleAC = (newTodolistTitle: string, todolistID:string): ChangeTodolistTitleActionType => ({type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle});
const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID:string): ChangeTodolistFilterActionType => ({type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter});

export default todoListsReducer;
export {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC}