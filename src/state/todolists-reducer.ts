import { v1 } from "uuid";
import todolistAPI, { TodoListType } from "../api/api";
import { Dispatch } from "redux";


type InferActionType<T> = T extends { [key: string]: (...arg: any[]) => infer U } ? U : never
export type TodoListActionsType = InferActionType<typeof actions>

const actions = {
    removeTodolistAC: (todolistId: string) => ({ type: "REMOVE_TODOLIST", id: todolistId } as const),
    addTodolistAC: (todoList: TodoListType) => ({ type: "ADD_TODOLIST", todoList} as const),
    changeTodolistTitleAC: (newTodolistTitle: string, todolistID: string) =>
        ({ type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle } as const),
    changeTodolistFilterAC: (newFilter: FilterValuesType, todolistID: string) =>
        ({ type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter } as const),
    setTodolistsAC: (todolists: Array<TodoListType>) => ({ type: "SET_TODOLISTS", todolists } as const)
}

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

const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListActionsType): Array<TodolistDomainType> => {
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



const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .getTodoLists()
            .then(r => dispatch(actions.setTodolistsAC(r.data)))
    }
}
const removeTodoListTC = (id: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .deleteTodoList(id)
            .then(() => dispatch(actions.removeTodolistAC(id)))
    }
}
const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .createTodoList(title)
            .then(({ data: { data: { item } } }) => dispatch(actions.addTodolistAC(item)))
    }
}
const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI
            .updateTodoList(id, title)
            .then(() => dispatch(actions.changeTodolistTitleAC(title, id)))
    }
}

export default todolistsReducer;
export {
    actions,
    fetchTodolistsTC,
    removeTodoListTC,
    addTodoListTC,
    changeTodolistTitleTC
}
