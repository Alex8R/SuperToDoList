import React
    from 'react';
import './App.css';
import TodoList
    from "./components/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const taskOne: Array<TaskType> = [{
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
    }];
    const taskTwo: Array<TaskType> = [{
        id: 4,
        title: 'ddd',
        isDone: false
    }, {
        id: 5,
        title: 'eee',
        isDone: true
    }, {
        id: 6,
        title: 'fff',
        isDone: false
    }];
    const taskThree: Array<TaskType> = [{
        id: 7,
        title: 'ggg',
        isDone: true
    }, {
        id: 8,
        title: 'hhh',
        isDone: true
    }, {
        id: 9,
        title: 'iii',
        isDone: false
    }];

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={taskOne}/>
            <TodoList title={'What to buy'} tasks={taskTwo}/>
            <TodoList title={'What to read'} tasks={taskThree}/>
        </div>
    );
}

export default App;