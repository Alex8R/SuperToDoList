import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import todolistReducer, {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC} from "./todolist-reducer";

test("Correct todolist should be removed", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ]

    const endState = todolistReducer(startState, removeTodolistAC(todoListId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test("Correct todolist should be added", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newTodolistTitle = "New TODOList";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
})

test("Todolist should change his title", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newTodolistTitle = "New TODOList";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];

    const action = changeTodolistTitleAC(newTodolistTitle, todoListId2)
    const endState = todolistReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test("Todolist should change his filter correctly", () => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    const newFilter: FilterValuesType = "active";

    const startState: Array<TodoListType> = [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"},
    ];

    const action = changeTodolistFilterAC(newFilter, todoListId2);
    const endState = todolistReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})