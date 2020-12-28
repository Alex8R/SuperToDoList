import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (taskTitle: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

function TodoList(props: TodoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string>('');

    const addTaskHandler = () => {
        if (!newTaskTitle.trim()) {
            setError('Title field is required');
            return;
        }
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    }
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
        setError('');
    };

    const onInputSubmitHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") addTaskHandler();
    };

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={newTaskTitle}
                    onChange={onTitleChangeHandler}
                    onKeyPress={onInputSubmitHandler}
                />
                <button onClick={addTaskHandler}>+</button>
                {error &&
                <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id);
                    const onchangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.target.checked);

                    return (
                        <li
                            className={''}
                            key={task.id}
                        >
                            <input
                                type="checkbox"
                                checked={task.isDone}
                                onChange={onchangeTaskStatusHandler}
                            />
                            <span className={task.isDone ? 'is-done' : ''}>{task.title}</span>
                            <button onClick={onRemoveHandler}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}
                >Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;