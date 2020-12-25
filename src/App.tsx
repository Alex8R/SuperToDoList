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
        { id: v1(), title: 'aaa', isDone: true },
        { id: v1(), title: 'bbb', isDone: false },
        { id: v1(), title: 'ccc', isDone: true }
    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(taskId: string) {
        setTasks(tasks.filter((task => task.id !== taskId)));
    }

    function addTask(taskTitle: string) {
        const newTask = { id: v1(), title: taskTitle, isDone: false }
        setTasks([newTask, ...tasks]);
    }

    function changeFilter(filterValue: FilterValuesType) {
        setFilter(filterValue);
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
            />
        </div>
    );
}

export default App;