import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import AddItemForm from "./components/AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, FilterValuesType, TodolistDomainType, fetchTodolistsTC } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "./state/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { TaskStatuses } from "./api/api";

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const removeTask = useCallback((taskId: string, todoListId: string) =>
        dispatch(removeTaskAC(taskId, todoListId)), [ dispatch ]);
    const changeFilter = useCallback((filterValue: FilterValuesType, todoListId: string) =>
        dispatch(changeTodolistFilterAC(filterValue, todoListId)), [ dispatch ]);
    const addTask = useCallback((taskTitle: string, todoListId: string) =>
        dispatch(addTaskAC(taskTitle, todoListId)), [ dispatch ]);
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) =>
        dispatch(changeTaskStatusAC(taskId, todoListId, status)), [ dispatch ]);
    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) =>
        dispatch(changeTaskTitleAC(taskId, todoListId, title)), [ dispatch ]);
    const removeTodoList = useCallback((id: string) =>
        dispatch(removeTodolistAC(id)), [ dispatch ]);
    const addTodoList = useCallback((todoListTitle: string) =>
        dispatch(addTodolistAC(todoListTitle)), [ dispatch ]);
    const changeTodoListTitle = useCallback((title: string, todolistId: string) =>
        dispatch(changeTodolistTitleAC(title, todolistId)), [ dispatch ]);

    useEffect(()=> {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

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