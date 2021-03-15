import {v1} from "uuid";
import todolistsReducer, { removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, FilterValuesType, TodolistDomainType } from "./todolists-reducer";

let todoListId1: string;
let todoListId2: string;
let newTodolistTitle: string;
let newFilter: FilterValuesType;
let startState: Array<TodolistDomainType>;

beforeEach(()=> {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "all", order: 0, addedDate: ""},
    ]
})

test("Correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test("Correct todolist should be added", () => {
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
    expect(endState[2].filter).toBe("all");
})

test("Todolist should change his title", () => {
    newTodolistTitle = "New TODOList";
    const action = changeTodolistTitleAC(newTodolistTitle, todoListId2)
    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
})

test("Todolist should change his filter correctly", () => {
    newFilter = "active";
    const action = changeTodolistFilterAC(newFilter, todoListId2);
    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})