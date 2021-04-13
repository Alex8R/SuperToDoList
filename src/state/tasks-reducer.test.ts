import tasksReducer, { addTaskAC, changeTaskStatusAC, removeTaskAC, setTasksAC, TasksStateType } from "./tasks-reducer";
import todolistsReducer, { actions, TodolistDomainType } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TodoListType } from "../api/api";
import { v1 } from "uuid";

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" }
        ]
    }
})

test('Correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" },
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: "", order: 0, priority: TaskPriorities.Low, addedDate: "", deadline: "", startDate: "" }
        ]
    })
});

test('Correct task should be added to correct array', () => {
    const task = { id: "2",
        title: "juice",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        order: 0,
        priority: TaskPriorities.Low,
        addedDate: "",
        deadline: "",
        startDate: ""
    };
    const endState = tasksReducer(startState, addTaskAC(task))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {
    // const task =
    const endState = tasksReducer(startState, changeTaskStatusAC("2", "todolistId2", TaskStatuses.New))

    expect(endState["todolistId2"][1].status).toBeFalsy();
    expect(startState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('New array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, actions.addTodolistAC({id: v1(), addedDate:'', order: 0, title: "new todolist"}))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('Ids should be equals', () => {
    const newTodolistTitle = "New TODOList";
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    const newTodoList: TodoListType = {id: v1(), addedDate:'', order: 0, title: newTodolistTitle}
    const action = actions.addTodolistAC(newTodoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(newTodoList.id);
    expect(idFromTodolists).toBe(newTodoList.id);
});

test('property with todolistId should be deleted', () => {
    const action = actions.removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('Empty task array should be added when we set todolists', () => {
    const todolists = [
        {id: '1', title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: '2', title: "What to buy", filter: "all", order: 0, addedDate: ""},
    ]
    const testState = tasksReducer({}, actions.setTodolistsAC(todolists))
    expect(testState['1']).toStrictEqual([])
    expect(testState['2']).toStrictEqual([])
    expect(testState['2']).toBeDefined()
})


test('Tasks should be added for todolist', () => {
    const tasks = startState["todolistId1"];

    const testState = tasksReducer({
        "todolistId1":[],
        "todolistId2": []
    }, setTasksAC(tasks, "todolistId1"))
    expect(testState["todolistId1"].length).toBe(3)
    expect(testState["todolistId2"].length).toBe(0)
})