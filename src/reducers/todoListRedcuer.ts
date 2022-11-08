import {todoListAPI, TodoListType} from "../todoListAPI/todoListAPI";
import {FilterValueType} from "../App";
import {Dispatch} from "redux";

export type TodoListsActionType = ChangeTodoListTitleActionType | AddTodoListActionType | DeleteTodoListActionType
    | SetTodoListsActionType

const initialState: initialStateType = []
type initialStateType = TodoListResponseType[]
type TodoListResponseType = TodoListType & { filter: FilterValueType }

export const todoListsReducer = (state = initialState, action: TodoListsActionType): initialStateType => {
    switch (action.type) {
        case "TODOLISTS/SET-TODOLISTS": {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all'}))
        }
        case "TODOLISTS/CHANGE-TODOLISTS-TITLE": {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.todoListTitle
            } : tl)
        }
        case "TODOLISTS/ADD-TODOLIST": {
            return [{...action.payload.todoList, filter: 'all'}, ...state]
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
export type SetTodoListsActionType = ReturnType<typeof setTodoLists>


export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string) => ({type: 'TODOLISTS/CHANGE-TODOLISTS-TITLE', payload: {todoListId, todoListTitle}} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: 'TODOLISTS/ADD-TODOLIST', payload: {todoList}} as const)
export const deleteTodoListAC = (todoListId: string) => ({type: 'TODOLISTS/DELETE-TODOLIST', payload: {todoListId}} as const)
export const setTodoLists = (todoLists: TodoListType[]) => ({type: 'TODOLISTS/SET-TODOLISTS', payload: {todoLists}} as const)

export const getTodoLists = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists()
        .then(res => dispatch(setTodoLists(res.data)))
}
export const createTodoList = (todoListTitle: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(todoListTitle)
        .then((res) => dispatch(addTodoListAC(res.data.data.item)))
}
export const deleteTodoList = (todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodoList(todoListId)
        .then(() => dispatch(deleteTodoListAC(todoListId)))
}
export const updateTodoListTitle = (todoListId: string, todoListTitle: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoListTitle(todoListId, todoListTitle)
        .then(() => dispatch(changeTodoListTitleAC(todoListId, todoListTitle)))
}