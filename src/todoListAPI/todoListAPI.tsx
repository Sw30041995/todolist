import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '47e20be3-e07c-4042-adfa-a0f1c7b542da'
    }
})

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListResponseType[]>('todo-lists')
    },
    createTodoList(todoListTitle: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodoListResponseType }>>>('todo-lists',
            {title: todoListTitle})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<AxiosResponse<ResponseType>>(`todo-lists/${todoListId}`)
    },
    updateTodoListTitle(todoListId: string, todoListTitle: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}`,
            {title: todoListTitle})
    }
}

export const taskAPI = {
    getTasks(todoListId: string) {
        return instance.get<{ items: TaskResponseType[] }>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, taskTitle: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskResponseType }>>>(`todo-lists/${todoListId}/tasks`,
            {title: taskTitle})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, taskData: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskResponseType }>>>(`todo-lists/${todoListId}/tasks/${taskId}`, taskData)
    }
}

export const authAPI = {
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', loginData)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<MeDataType>>('auth/me')
    }
}

export type TodoListResponseType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TaskResponseType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type MeDataType = {
    id: number
    email: string
    login: string
}
