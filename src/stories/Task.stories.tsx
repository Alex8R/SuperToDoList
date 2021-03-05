import React from "react";
import AddItemForm from "../components/AddItemForm";
import { action } from "@storybook/addon-actions";
import { Task } from "../components/Task";

export default {
    title: "Task Component",
    component: Task
}

const changeTaskStatusCallback = action("Task status is change");
const changeTaskTitleCallback = action("Task title will change");
const removeTaskCallback = action("Task removed");

export const TaskExample = () => {
    return (
        <>
            <Task
                task={{id: "task-1", isDone:true, title: "Done task"}}
                todoListId={"todolist-1"}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
            />
            <Task
                task={{id: "task-2", isDone:false, title: "Task in progress"}}
                todoListId={"todolist-2"}
                changeTaskStatus={changeTaskStatusCallback}
                changeTaskTitle={changeTaskTitleCallback}
                removeTask={removeTaskCallback}
            />
        </>
    )
}