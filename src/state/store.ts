import { applyMiddleware, combineReducers, createStore } from "redux";
import todolistsReducer from "./todolist/todolists-reducer";
import tasksReducer from "./tasks/tasks-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk))