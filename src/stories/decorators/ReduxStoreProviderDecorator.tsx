import React from "react";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import todolistsReducer from "../../state/todolists-reducer";
import tasksReducer from "../../state/tasks-reducer";
import { v1 } from "uuid";
import { AppRootStateType } from "../../state/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})
const initialGlobalState = {
    todolists: [
        {id: "todoListId1", title: "What to learn", filter: "all"},
        {id: "todoListId2", title: "What to buy", filter: "all"},
    ],
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: 'Learn React', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: true},
        ],
        ["todoListId2"]: [
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Tomato", isDone: true},
        ]
    }
}

const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => <Provider store={storyBookStore}>{storyFn()}</Provider>