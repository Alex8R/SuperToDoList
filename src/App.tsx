import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";
import {v1} from 'uuid';

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
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'Lear React', isDone: false},
        {id: v1(), title: 'JavaScript', isDone: false},
        {id: v1(), title: 'Html', isDone: true},
        {id: v1(), title: 'CSS', isDone: true}
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(taskId: string) {
        setTasks(tasks.filter((task => task.id !== taskId)));
    }

    function addTask(taskTitle: string) {
        const newTask = {id: v1(), title: taskTitle, isDone: false}
        setTasks([newTask, ...tasks]);
    }

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue);
    }

    function changeTaskStatus(taskId: string, isDone: boolean) {
        const task = tasks.find(task => task.id === taskId)
        if (task) task.isDone = isDone;
        setTasks([...tasks])
    }

    let todoListTasks = tasks;
    if (filter === "active") todoListTasks = tasks.filter(task => !task.isDone);
    if (filter === "completed") todoListTasks = tasks.filter(task => task.isDone);

    return (
        <div className="App">
            <TodoList title={'What to learn'}
                      tasks={todoListTasks}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;