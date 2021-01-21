import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <h3 style={{textAlign: "center"}}>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodoListTitle}
                />
                <IconButton onClick={onRemoveTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyleType: "none", paddingLeft: 0}}>
                {props.tasks.map(task => {
                    const onRemoveHandler = () => props.removeTask(task.id, props.id);
                    const onchangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                        props.changeTaskStatus(task.id, e.target.checked, props.id);
                    const changeTitle = (title: string) =>
                        props.changeTaskTitle(task.id, title, props.id);
                    return (
                        <li
                            key={task.id}
                        >
                            <label className={task.isDone ? 'is-done' : ''} >
                                <Checkbox
                                    color={"primary"}
                                    checked={task.isDone}
                                    onChange={onchangeTaskStatusHandler}
                                />
                                <EditableSpan
                                    title={task.title}
                                    changeTitle={changeTitle}
                                />
                            </label>
                            <IconButton onClick={onRemoveHandler}>
                                <Delete/>
                            </IconButton>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button
                    size={"small"}
                    style={{marginRight: "5px"}}
                    variant={props.filter === 'all' ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    size={"small"}
                    style={{marginRight: "5px"}}
                    variant={props.filter === 'active' ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === 'completed' ? "outlined" : "contained"}
                    color={"primary"}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
}

export default TodoList;