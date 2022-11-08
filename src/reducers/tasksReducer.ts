import {v1} from "uuid";
import {AddTodoListActionType, DeleteTodoListActionType} from "./todoListRedcuer";
import {taskAPI, TaskType, UpdateDomainTaskModelType, UpdateTaskModelType} from "../todoListAPI/todoListAPI";
import {AppThunk} from "../store/store";

export type TasksActionsType =
    DeleteTaskActionType
    | UpdateTaskActionType
    | AddTaskActionType
    | AddTodoListActionType
    | DeleteTodoListActionType
    | SetTasksActionType

const initialState: initialStateType = {}

type initialStateType = { [key: string]: TaskType[] }

export const tasksReducer = (state = initialState, action: TasksActionsType): initialStateType => {
    switch (action.type) {
        case "TASKS/SET-TASKS": {
            return {...state, [action.payload.todoListId]: [...action.payload.tasks]}
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
                ...state, [action.payload.todoListId]: [{...action.payload.task}, ...state[action.payload.todoListId]]
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
export const addTaskAC = (todoListId: string, task: TaskType) => ({
    type: 'TASKS/ADD-TASK',
    payload: {todoListId, task}
} as const)
export const setTasks = (todoListId: string, tasks: TaskType[]) => ({
    type: 'TASKS/SET-TASKS',
    payload: {todoListId, tasks}
} as const)

export const getTasks = (todoListId: string): AppThunk => (dispatch) => {
    taskAPI.getTasks(todoListId)
        .then(res => dispatch(setTasks(todoListId, res.data.items)))
}

export const createTask = (todoListId: string, taskTitle: string): AppThunk => (dispatch) => {
    taskAPI.createTask(todoListId, taskTitle)
        .then(res => dispatch(addTaskAC(todoListId, res.data.data.item)))
}

export const removeTask = (todoListId: string, taskId: string): AppThunk => (dispatch) => {
    taskAPI.deleteTask(todoListId, taskId)
        .then(() => dispatch(deleteTaskAC(todoListId, taskId)))
}

export const updateTask = (todoListId: string, taskId: string, taskData: UpdateDomainTaskModelType): AppThunk =>
    (dispatch, getState) => {

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
            .then(() => dispatch(updateTaskAC(todoListId, taskId, taskData)))
    }

