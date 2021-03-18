import React, { useEffect, useState } from 'react'
import API from "../api/api";
import todolistAPI from "../api/api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [ state, setState ] = useState<any>(null)

    const getTodoLists = () => {
        todolistAPI.getTodoLists()
            .then(res => setState(res.data))
    }
    return <>
        <button onClick={ getTodoLists }>Get todolist</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const CreateTodolist = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistTitle, setTodoListTitle] = useState<string>("");

    const createTodolist = () => {
        todolistAPI.createTodoList(todolistTitle)
            .then(res => setState(res.data))
    }
    return <>
        <input
            type="text"
            placeholder={"todolist title"}
            value={todolistTitle}
            onChange={(e) => setTodoListTitle(e.currentTarget.value)}
        />
        <button onClick={createTodolist}>Create todolist</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const DeleteTodolist = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");

    const deleteTodolist = () => {
        todolistAPI.deleteTodoList(todolistId)
            .then(res => setState(res.data))
    }

    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <button onClick={deleteTodolist}>Delete todolist</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const UpdateTodolistTitle = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");
    const [todolistTitle, setTodoListTitle] = useState<string>("");

    const updateTodolist = () => {
        todolistAPI.updateTodoList(todolistId, todolistTitle)
            .then(res => setState(res.data))
    }

    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <input
            type="text"
            placeholder={"todolist title"}
            value={todolistTitle}
            onChange={(e) => setTodoListTitle(e.currentTarget.value)}
        />
        <button onClick={updateTodolist}>Update todolist</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}

export const GetTasks = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");
    const getTodoLists = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }
    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <button onClick={getTodoLists}>get tasks</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const AddTask = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const addTask = () => {
        todolistAPI.addTask(todolistId, taskTitle)
            .then(res => setState(res.data))
    }
    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <input
            type="text"
            placeholder={"task title"}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={addTask}>Add tasks</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const DeleteTask = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }
    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <input
            type="text"
            placeholder={"task id"}
            value={taskId}
            onChange={(e) => setTaskId(e.currentTarget.value)}
        />
        <button onClick={deleteTask}>Delete tasks</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}
export const UpadateTask = () => {
    const [ state, setState ] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, {
            title: taskTitle,
            deadline: "",
            description: "",
            status: 2,
            priority: 2,
            startDate: ""
        })
            .then(res => setState(res.data))
    }
    return <>
        <input
            type="text"
            placeholder={"todolist id"}
            value={todolistId}
            onChange={(e) => setTodolistId(e.currentTarget.value)}
        />
        <input
            type="text"
            placeholder={"task id"}
            value={taskId}
            onChange={(e) => setTaskId(e.currentTarget.value)}
        />
        <input
            type="text"
            placeholder={"task title"}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.currentTarget.value)}
        />
        <button onClick={updateTask}>update tasks</button>
        <div>Response data: { JSON.stringify(state) }</div>
    </>
}