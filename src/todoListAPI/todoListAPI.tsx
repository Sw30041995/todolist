import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '47e20be3-e07c-4042-adfa-a0f1c7b542da'
    }
})

export const todoListAPI = {
    getTodoLists () {
        return instance.get<TodoListType[]>('/todo-lists')
    }
}

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
