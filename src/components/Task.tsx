import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import { Delete } from "@material-ui/icons";
import { TaskType } from "../App";

type TaskPropsType = {
    task: TaskType
    todoListId: string
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = useCallback(() =>
        props.removeTask(props.task.id, props.todoListId), [props.removeTask, props.task.id, props.todoListId]);
    const onchangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) =>
        props.changeTaskStatus(props.task.id, e.target.checked, props.todoListId), [ props.changeTaskStatus, props.task.id, props.todoListId ]);
    const changeTitle = useCallback((title: string) =>
        props.changeTaskTitle(props.task.id, title, props.todoListId), [ props.changeTaskTitle, props.task.id, props.todoListId ]);

    return (
        <li>
            <label className={ props.task.isDone ? 'is-done' : '' }>
                <Checkbox
                    color={ "primary" }
                    checked={ props.task.isDone }
                    onChange={ onchangeTaskStatusHandler }
                />
                <EditableSpan
                    title={ props.task.title }
                    changeTitle={ changeTitle }
                />
            </label>
            <IconButton onClick={ onRemoveHandler }>
                <Delete/>
            </IconButton>
        </li>
    )
})
export { Task };