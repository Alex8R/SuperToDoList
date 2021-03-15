import tasksReducer, { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "./tasks-reducer";
import todolistsReducer, { addTodolistAC, removeTodolistAC, TodolistDomainType } from "./todolists-reducer";

let startState: TasksStateType;
// TODO: Make a test refactor
beforeEach(()=> {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "2", title: "milk", isDone: true},
            {id: "3", title: "tea", isDone: false}
        ]
    }
})

test('Correct task should be deleted from correct array', () => {
    const endState = tasksReducer(startState, removeTaskAC("2", "todolistId2"))

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", isDone: false},
            {id: "2", title: "JS", isDone: true},
            {id: "3", title: "React", isDone: false}
        ],
        "todolistId2": [
            {id: "1", title: "bread", isDone: false},
            {id: "3", title: "tea", isDone: false}
        ]
    })
});

test('Correct task should be added to correct array', () => {
    const endState = tasksReducer(startState, addTaskAC("juice", "todolistId2"))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBeFalsy();
})

test('status of specified task should be changed', () => {
    const endState = tasksReducer(startState, changeTaskStatusAC("2", "todolistId2", false))

    expect(endState["todolistId2"][1].status).toBeFalsy();
    expect(startState["todolistId1"][1].status).toBeTruthy();
});

test('New array should be added when new todolist is added', () => {
    const endState = tasksReducer(startState, addTodolistAC("new todolist"))

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('Ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.id);
    expect(idFromTodolists).toBe(action.id);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});
