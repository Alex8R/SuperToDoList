import React from "react";
import { action } from "@storybook/addon-actions";
import { Task } from "../components/Task";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/api";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action("Task status is change");
const changeTaskTitleCallback = action("Task title will change");
const removeTaskCallback = action("Task removed");
const firstTask: TaskType = {
    id: "task-1",
    todoListId: "todolist-1",
    title: 'Completed task',
    description: "",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    order: 0,
    addedDate: "",
    startDate: "",
    deadline: "",
}
const secondTask: TaskType = {
    id: "task-2",
    todoListId: "todolist-2",
    title: 'New Task',
    description: "",
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    order: 0,
    addedDate: "",
    startDate: "",
    deadline: ""
}
export const TaskExample = () => {
    return (
        <>
            <Task
                task={firstTask}
                todoListId={"todolist-1"}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
            />
            <Task
                task={secondTask}
                todoListId={"todolist-2"}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
            />
        </>
    )
}