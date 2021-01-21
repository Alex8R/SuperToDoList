import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
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

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]);
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(task => task.id !== taskId);
        setTasks({...tasks});
    }

    function changeFilter(filterValue: FilterValuesType, todoListId: string) {
        const todoList = todoLists.find(todoList => todoList.id === todoListId);
        if (todoList) {
            todoList.filter = filterValue;
            setTodoLists([...todoLists]);
        }
    }

    function addTask(taskTitle: string, todoListId: string) {
        const newTask = {id: v1(), title: taskTitle, isDone: false};
        tasks[todoListId] = [newTask, ...tasks[todoListId]];
        setTasks({...tasks});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        const task = tasks[todoListId].find(task => task.id === taskId)
        if (task) task.isDone = isDone;
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListId: string) {
        const task = tasks[todoListId].find(task => task.id === taskId)
        if (task) task.title = title;
        setTasks({...tasks})
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(todoList => todoList.id !== id));
        delete tasks[id]
    }

    function addTodoList(todoListTitle: string) {
        const todoListId = v1();
        const newTodolist: TodoListType = {
            id: todoListId,
            title: todoListTitle,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist]);
        setTasks({
            ...tasks,
            [todoListId]: []
        });
    }

    function changeTodoListTitle(title: string, todolistId: string) {
        const todolist = todoLists.find(todoList => todoList.id === todolistId)
        if (todolist) todolist.title = title;
        setTodoLists([...todoLists])
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