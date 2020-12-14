import React, {useState} from 'react';
import './App.css';
import TodoList from "./components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([{
        id: 1,
        title: 'aaa',
        isDone: true
    }, {
        id: 2,
        title: 'bbb',
        isDone: false
    }, {
        id: 3,
        title: 'ccc',
        isDone: true
    }]);
    const [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(taskId: number) {
        setTasks(tasks.filter((task => task.id !== taskId)));
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
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;