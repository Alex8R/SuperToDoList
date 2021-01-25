import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    id: string
}

type AddTodolistActionType = {
    type: "ADD_TODOLIST"
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

const todolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.id);
        }
        case "ADD_TODOLIST": {
            const todoListId = v1();
            const newTodolist: TodoListType = {
                id: todoListId,
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
            throw new Error("Incorrect action")
    }
};

const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({type: "REMOVE_TODOLIST", id: todolistId});
const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => ({type: "ADD_TODOLIST", title: newTodolistTitle});
const changeTodolistTitleAC = (newTodolistTitle: string, todolistID:string): ChangeTodolistTitleActionType => ({type: "CHANGE_TODOLIST_TITLE", id: todolistID, title: newTodolistTitle});
const changeTodolistFilterAC = (newFilter: FilterValuesType, todolistID:string): ChangeTodolistFilterActionType => ({type: "CHANGE_TODOLIST_FILTER", id: todolistID, filter: newFilter});

export default todolistReducer;
export {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC}