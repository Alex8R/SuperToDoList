import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

function TodoList(props: TodoListPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const onRemoveTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    return (
        <div>
            <h3>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodoListTitle}
                />
                <button onClick={onRemoveTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.id);
                    const onchangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.target.checked, props.id);
                    const changeTitle = (title: string) =>
                        props.changeTaskTitle(task.id, title, props.id);
                    return (
                        <li
                            className={task.isDone ? 'is-done' : ''}
                            key={task.id}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={onchangeTaskStatusHandler}
                                />
                                <EditableSpan
                                    title={task.title}
                                    changeTitle={changeTitle}
                                />
                            </label>
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