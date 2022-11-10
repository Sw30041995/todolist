import {v1} from "uuid";
import {AddTodoListActionType, DeleteTodoListActionType} from "./todoListReducer";
import {taskAPI, TaskResponseType, UpdateDomainTaskModelType, UpdateTaskModelType} from "../todoListAPI/todoListAPI";
import {AppThunk} from "../store/store";
import {setAppStatusAC, setErrorAC} from "./appReducer";

export type TasksActionsType =
    DeleteTaskActionType
    | UpdateTaskActionType
    | AddTaskActionType
    | AddTodoListActionType
    | DeleteTodoListActionType
    | SetTasksActionType
    | ChangeEntityTaskStatusActionType

const initialState: initialStateType = {}

type initialStateType = { [key: string]: TaskType[] }
export type TaskType = TaskResponseType & { entityStatus: TaskEntityStatusType }
export type TaskEntityStatusType = 'checkboxLoading' | 'buttonLoading' | 'idle'

export const tasksReducer = (state = initialState, action: TasksActionsType): initialStateType => {
    switch (action.type) {
        case "TASKS/SET-TASKS": {
            return {
                ...state, [action.payload.todoListId]: action.payload.tasks.map(t => ({...t, entityStatus: 'idle'}))
            }
        }
        case "TASKS/CHANGE-ENTITY-TASK-STATUS": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ?
                    {...t, entityStatus: action.payload.status} : t)
            }
        }
        case "TASKS/DELETE-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case "TASKS/UPDATE-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(t => t.id === action.payload.taskId ?
                    {...t, ...action.payload.taskModel} : t)
            }
        }
        case "TASKS/ADD-TASK": {
            return {
                ...state,
                [action.payload.todoListId]: [{
                    ...action.payload.task,
                    entityStatus: 'idle'
                }, ...state[action.payload.todoListId]]
            }
        }
        case "TODOLISTS/ADD-TODOLIST": {
            return {...state, [v1()]: []}
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
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type SetTasksActionType = ReturnType<typeof setTasks>
type ChangeEntityTaskStatusActionType = ReturnType<typeof changeEntityTaskStatus>

export const deleteTaskAC = (todoListId: string, taskId: string) => ({
    type: 'TASKS/DELETE-TASK',
    payload: {
        todoListId,
        taskId
    }
} as const)
export const updateTaskAC = (todoListId: string, taskId: string, taskModel: UpdateDomainTaskModelType) => ({
    type: 'TASKS/UPDATE-TASK',
    payload: {
        todoListId,
        taskId,
        taskModel
    }
} as const)
export const addTaskAC = (todoListId: string, task: TaskResponseType) => ({
    type: 'TASKS/ADD-TASK',
    payload: {todoListId, task}
} as const)
export const setTasks = (todoListId: string, tasks: TaskResponseType[]) => ({
    type: 'TASKS/SET-TASKS',
    payload: {todoListId, tasks}
} as const)
export const changeEntityTaskStatus = (todoListId: string, taskId: string, status: TaskEntityStatusType) => ({
    type: 'TASKS/CHANGE-ENTITY-TASK-STATUS',
    payload: {todoListId, taskId, status}
} as const)


export const getTasks = (todoListId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    taskAPI.getTasks(todoListId)
        .then(res => {
            dispatch(setTasks(todoListId, res.data.items))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
}

export const createTask = (todoListId: string, taskTitle: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    taskAPI.createTask(todoListId, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todoListId, res.data.data.item))
            } else {
                dispatch(setErrorAC(res.data.messages[0]))
            }
        })
        .catch((e) => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const removeTask = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    dispatch(changeEntityTaskStatus(todoListId, taskId, 'buttonLoading'))
    taskAPI.deleteTask(todoListId, taskId)
        .then(() => {
            dispatch(deleteTaskAC(todoListId, taskId))
            dispatch(changeEntityTaskStatus(todoListId, taskId, 'idle'))
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
}

export const updateTask = (todoListId: string, taskId: string, taskData: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState) => {
        dispatch(changeEntityTaskStatus(todoListId, taskId, 'checkboxLoading'))
        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const taskModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            completed: task.completed,
            ...taskData
        }
        taskAPI.updateTask(todoListId, taskId, taskModel)
            .then(() => {
                dispatch(updateTaskAC(todoListId, taskId, taskData))
                dispatch(changeEntityTaskStatus(todoListId, taskId, 'idle'))
            })
            .catch(e => {
                dispatch(setErrorAC(e.message))
            })
    }

