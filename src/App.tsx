import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import todoListsReducer, {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todo-lists-reducer";
import tasksReducer from "./state/tasks-reducer";
import {removeTaskAC, addTaskAC, changeTaskTitleAC, changeTaskStatusAC} from "./state/tasks-reducer";
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
    const todoListId1 = v1();
    const todoListId2 = v1();

    const [todoLists, dispatchToTodoListsReducer] = useReducer(todoListsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]);
    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: 'Learn React', isDone: false},
            {id: v1(), title: 'JavaScript', isDone: false},
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'CSS', isDone: true}
        ],
        [todoListId2]: [
            {id: v1(), title: "Fish", isDone: false},
            {id: v1(), title: "Tomato", isDone: false},
            {id: v1(), title: "Apple MacBook Pro M1", isDone: false},
            {id: v1(), title: "British Petroleum", isDone: false}
        ]
    });

    function removeTask(taskId: string, todoListId: string) {
        dispatchToTasksReducer(removeTaskAC(taskId, todoListId))
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        dispatchToTodoListsReducer(changeTodolistFilterAC(filterValue, todoListId))
    }

    function addTask(taskTitle: string, todoListId: string) {
        dispatchToTasksReducer(addTaskAC(taskTitle, todoListId))
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, todoListId, isDone))
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, todoListId, title))
    }

    function removeTodoList(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    function addTodoList(todoListTitle: string) {
        const action = addTodolistAC(todoListTitle)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    function changeTodoListTitle(title: string, todolistId: string) {
        dispatchToTodoListsReducer(changeTodolistTitleAC(title, todolistId))
    }

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
                    style={{padding: "20px 0"}}
                    container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(todoList => {
                            let todoListTasks = tasks[todoList.id];
                            if (todoList.filter === "active") todoListTasks = tasks[todoList.id].filter(task => !task.isDone);
                            if (todoList.filter === "completed") todoListTasks = tasks[todoList.id].filter(task => task.isDone);

                            return (
                                <Grid
                                    item
                                    key={todoList.id}>
                                    <TodoList

                                        id={todoList.id}
                                        title={todoList.title}
                                        filter={todoList.filter}
                                        tasks={todoListTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
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