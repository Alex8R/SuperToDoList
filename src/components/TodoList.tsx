import React, { useCallback, useEffect } from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from "./Task";
import { FilterValuesType } from "../state/todolist/todolists-reducer";
import { TaskStatuses, TaskType } from "../api/api";
import { useDispatch } from "react-redux";
import { fetchTasksTC } from "../state/tasks/tasks-reducer";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (taskTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (title: string, todolistId: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchTasksTC(props.id))
    }, [props.id, dispatch])

    let tasks = props.tasks;
    if (props.filter === "active") tasks = props.tasks.filter(t => t.status !== TaskStatuses.Completed);
    if (props.filter === "completed") tasks = props.tasks.filter(t => t.status === TaskStatuses.Completed);

    const addTask = useCallback((title: string) =>
        props.addTask(title, props.id), [ props.addTask, props.id ]);
    const onAllClickHandler = useCallback(() =>
        props.changeFilter("all", props.id), [ props.changeFilter, props.id ]);
    const onActiveClickHandler = useCallback(() =>
        props.changeFilter("active", props.id), [ props.changeFilter, props.id ]);
    const onCompletedClickHandler = useCallback(() =>
        props.changeFilter("completed", props.id), [ props.changeFilter, props.id ]);
    const onRemoveTodoList = useCallback(() =>
        props.removeTodoList(props.id), [ props.removeTodoList ]);
    const changeTodoListTitle = useCallback((title: string) =>
        props.changeTodoListTitle(title, props.id), [ props.changeTodoListTitle, props.id ]);

    return (
        <div>
            <h3 style={ { textAlign: "center" } }>
                <EditableSpan
                    title={ props.title }
                    changeTitle={ changeTodoListTitle }
                />
                <IconButton onClick={ onRemoveTodoList }>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask }/>
            <ul style={ { listStyleType: "none", paddingLeft: 0 } }>
                { tasks.map(task => (
                    <Task
                        key={ task.id }
                        todoListId={ props.id }
                        task={ task }
                        removeTask={ props.removeTask }
                        changeTaskStatus={ props.changeTaskStatus }
                        changeTaskTitle={ props.changeTaskTitle }
                    />
                )) }
            </ul>
            <div>
                <Button
                    size={ "small" }
                    style={ { marginRight: "5px" } }
                    variant={ props.filter === 'all' ? "outlined" : "contained" }
                    color={ "primary" }
                    onClick={ onAllClickHandler }
                >All
                </Button>
                <Button
                    size={ "small" }
                    style={ { marginRight: "5px" } }
                    variant={ props.filter === 'active' ? "outlined" : "contained" }
                    color={ "primary" }
                    onClick={ onActiveClickHandler }
                >Active
                </Button>
                <Button
                    size={ "small" }
                    variant={ props.filter === 'completed' ? "outlined" : "contained" }
                    color={ "primary" }
                    onClick={ onCompletedClickHandler }
                >Completed
                </Button>
            </div>
        </div>
    );
})

export default TodoList;