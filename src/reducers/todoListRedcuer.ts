import {todoListId1, todoListId2} from "./tasksReducer";
import {v1} from "uuid";
import {TodoListType} from "../App";

export type TodoListsActionType = ChangeTodoListTitleActionType | AddTodoListActionType | DeleteTodoListActionType

const initialState: initialStateType = [
    {id: todoListId1, title: 'What to learn?', filter: 'all'},
    {id: todoListId2, title: 'What to buy?', filter: 'all'}
]
type initialStateType = TodoListType[]

export const todoListsReducer = (state = initialState, action: TodoListsActionType): initialStateType => {
    switch (action.type) {
        case "TODOLISTS/CHANGE-TODOLISTS-TITLE": {
            return state.map(tl => tl.id === action.payload.todoListId ? {
                ...tl,
                title: action.payload.todoListTitle
            } : tl)
        }
        case "TODOLISTS/ADD-TODOLIST": {
            return [{id: action.payload.todoListId, title: action.payload.todoListTitle, filter: 'all'}, ...state]
        }
        case "TODOLISTS/DELETE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todoListId)
        }
        default: {
            return state
        }
    }
}

type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitleAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type DeleteTodoListActionType = ReturnType<typeof deleteTodoListAC>

export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string) => ({
    type: 'TODOLISTS/CHANGE-TODOLISTS-TITLE',
    payload: {
        todoListId,
        todoListTitle
    }
} as const)

export const addTodoListAC = (todoListTitle: string) => ({
    type: 'TODOLISTS/ADD-TODOLIST',
    payload: {
        todoListTitle,
        todoListId: v1()
    }
} as const)

export const deleteTodoListAC = (todoListId: string) => ({
    type: 'TODOLISTS/DELETE-TODOLIST',
    payload: {
        todoListId
    }
} as const)