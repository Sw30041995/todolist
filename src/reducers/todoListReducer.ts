import {todoListAPI, TodoListResponseType} from "../todoListAPI/todoListAPI";
import {FilterValueType} from "../App";
import {AppThunk} from "../store/store";
import {setAppStatusAC, setErrorAC} from "./appReducer";

export type TodoListsActionType = ChangeTodoListTitleActionType | AddTodoListActionType | DeleteTodoListActionType
    | SetTodoListsActionType | ChangeEntityTodoStatusActionType

const initialState: initialStateType = []
type initialStateType = TodoListType[]
type TodoListType = TodoListResponseType & { filter: FilterValueType, entityStatus: TodoEntityStatusType }
export type TodoEntityStatusType = 'buttonLoading' | 'titleLoading' | 'idle'

export const todoListsReducer = (state = initialState, action: TodoListsActionType): initialStateType => {
    switch (action.type) {
        case "TODOLISTS/CHANGE-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.payload.todoListId ?
                {...tl, entityStatus: action.payload.entityStatus} : tl)
        }
        case "TODOLISTS/SET-TODOLISTS": {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case "TODOLISTS/CHANGE-TODOLISTS-TITLE": {
            return state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.todoListTitle
            } : tl)
        }
        case "TODOLISTS/ADD-TODOLIST": {
            return [{...action.payload.todoList, filter: 'all', entityStatus: 'idle'}, ...state]
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
export type ChangeEntityTodoStatusActionType = ReturnType<typeof changeEntityTodoStatus>


export const changeTodoListTitleAC = (todoListId: string, todoListTitle: string) => ({type: 'TODOLISTS/CHANGE-TODOLISTS-TITLE', payload: {todoListId, todoListTitle}} as const)
export const addTodoListAC = (todoList: TodoListResponseType) => ({type: 'TODOLISTS/ADD-TODOLIST', payload: {todoList}} as const)
export const deleteTodoListAC = (todoListId: string) => ({type: 'TODOLISTS/DELETE-TODOLIST', payload: {todoListId}} as const)
export const setTodoLists = (todoLists: TodoListResponseType[]) => ({type: 'TODOLISTS/SET-TODOLISTS', payload: {todoLists}} as const)
export const changeEntityTodoStatus = (todoListId: string, entityStatus: TodoEntityStatusType) => ({type: 'TODOLISTS/CHANGE-ENTITY-STATUS', payload: {todoListId,entityStatus}} as const)

export const getTodoLists = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todoListAPI.getTodoLists()
        .then(res => {
            dispatch(setTodoLists(res.data))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const createTodoList = (todoListTitle: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTodoList(todoListTitle)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC(res.data.data.item))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
            }
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const deleteTodoList = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeEntityTodoStatus(todoListId, 'buttonLoading'))
    todoListAPI.deleteTodoList(todoListId)
        .then(() => {
            dispatch(deleteTodoListAC(todoListId))
            dispatch(changeEntityTodoStatus(todoListId, 'idle'))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}
export const updateTodoListTitle = (todoListId: string, todoListTitle: string): AppThunk => (dispatch) => {
    dispatch(changeEntityTodoStatus(todoListId, 'titleLoading'))
    todoListAPI.updateTodoListTitle(todoListId, todoListTitle)
        .then(() => {
            dispatch(changeTodoListTitleAC(todoListId, todoListTitle))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(changeEntityTodoStatus(todoListId, 'idle'))
        })
}