import {v1} from "uuid";
import {AddTodoListActionType, DeleteTodoListActionType} from "./todoListRedcuer";
import {TaskType} from "../App";

export type TasksActionsType =
    DeleteTaskActionType
    | UpdateTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTaskActionType
    | AddTodoListActionType
    | DeleteTodoListActionType


export const todoListId1 = v1()
export const todoListId2 = v1()

const initialState: initialStateType = {
    [todoListId1]: [
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ],
    [todoListId2]: [
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Auto', isDone: true},
        {id: v1(), title: 'Water', isDone: true},
    ]
}

type initialStateType = { [key: string]: TaskType[] }

export const tasksReducer = (state = initialState, action: TasksActionsType): initialStateType => {
    switch (action.type) {
        case "TASKS/DELETE-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "TASKS/UPDATE-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    isDone: action.payload.taskStatus
                } : t)
            }
        }
        case "TASKS/CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ? {
                    ...t,
                    title: action.payload.taskTitle
                } : t)
            }
        }
        case "TASKS/ADD-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.taskTitle,
                    isDone: false
                }, ...state[action.payload.todoListId]]
            }
        }
        case "TODOLISTS/ADD-TODOLIST": {
            return {...state, [action.payload.todoListId]: []}
        }
        case "TODOLISTS/DELETE-TODOLIST": {
            delete state[action.payload.todoListId]
            return {...state}
        }
        default:
            return state
    }
}

type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>
type UpdateTaskStatusActionType = ReturnType<typeof updateTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>

export const deleteTaskAC = (todoListId: string, taskId: string) => ({
    type: 'TASKS/DELETE-TASK',
    payload: {
        todoListId,
        taskId
    }
} as const)
export const updateTaskStatusAC = (todoListId: string, taskId: string, taskStatus: boolean) => ({
    type: 'TASKS/UPDATE-TASK-STATUS',
    payload: {
        todoListId,
        taskId,
        taskStatus
    }
} as const)
export const changeTaskTitleAC = (todoListId: string, taskId: string, taskTitle: string) => ({
    type: 'TASKS/CHANGE-TASK-TITLE',
    payload: {
        todoListId,
        taskId,
        taskTitle
    }
} as const)
export const addTaskAC = (todoListId: string, taskTitle: string) => ({
    type: 'TASKS/ADD-TASK',
    payload: {
        todoListId,
        taskTitle
    }
} as const)

