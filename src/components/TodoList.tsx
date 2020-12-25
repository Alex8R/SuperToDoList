import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onTitleChangeHandler = (event:ChangeEvent<HTMLInputElement>) =>
        setNewTaskTitle(event.currentTarget.value);

    const onInputSubmitHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onTitleChangeHandler}
                       onKeyPress={onInputSubmitHandler}
                />
                <button onClick={addTask}>
                    +
                </button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                        const onRemoveHandler = () => props.removeTask(task.id);

                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;