import React, { useCallback } from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType =
    "all"
    | "completed"
    | "active";

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);

    const removeTask = useCallback((taskId: string, todoListId: string) =>
        dispatch(removeTaskAC(taskId, todoListId)), [ dispatch ]);
    const changeFilter = useCallback((filterValue: FilterValuesType, todoListId: string) =>
        dispatch(changeTodolistFilterAC(filterValue, todoListId)), [ dispatch ]);
    const addTask = useCallback((taskTitle: string, todoListId: string) =>
        dispatch(addTaskAC(taskTitle, todoListId)), [ dispatch ]);
    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) =>
        dispatch(changeTaskStatusAC(taskId, todoListId, isDone)), [ dispatch ]);
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) =>
        dispatch(changeTaskTitleAC(taskId, todoListId, title)), [ dispatch ]);
    const removeTodoList = useCallback((id: string) =>
        dispatch(removeTodolistAC(id)), [ dispatch ]);
    const addTodoList = useCallback((todoListTitle: string) =>
        dispatch(addTodolistAC(todoListTitle)), [ dispatch ]);
    const changeTodoListTitle = useCallback((title: string, todolistId: string) =>
        dispatch(changeTodolistTitleAC(title, todolistId)), [ dispatch ]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid
                    style={ { padding: "20px 0" } }
                    container>
                    <AddItemForm addItem={ addTodoList }/>
                </Grid>
                <Grid container spacing={ 3 }>
                    {
                        todoLists.map(todoList => {
                            const todoListTasks = tasks[todoList.id];

                            return (
                                <Grid
                                    item
                                    key={ todoList.id }>
                                    <TodoList
                                        id={ todoList.id }
                                        title={ todoList.title }
                                        filter={ todoList.filter }
                                        tasks={ todoListTasks }
                                        removeTask={ removeTask }
                                        changeFilter={ changeFilter }
                                        addTask={ addTask }
                                        changeTaskStatus={ changeTaskStatus }
                                        changeTaskTitle={ changeTaskTitle }
                                        removeTodoList={ removeTodoList }
                                        changeTodoListTitle={ changeTodoListTitle }
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;