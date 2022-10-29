import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./TodoList";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    const [tasks, setTasks] = useState<{ [key: string]: TaskType[] }>({
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
    })

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId1, title: 'What to learn?', filter: 'all'},
        {id: todoListId2, title: 'What to buy?', filter: 'all'}
    ])

    const deleteTask = (todoListId: string, taskId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
    }

    const updateTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: taskStatus} : t)})
    }

    const addTask = (todoListId: string, taskTitle: string) => {
        setTasks({...tasks, [todoListId]: [{id: v1(), title: taskTitle, isDone: false}, ...tasks[todoListId]]})
    }

    const addTodoList = (todoListTitle: string) => {
        setTodoLists([{id: v1(), title: todoListTitle, filter: 'all'}, ...todoLists])
    }

    return (
        <div>
            <div><input type="text"/>
                <button>+</button>
            </div>
            <div className='App'>
                {todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id]

                    return <TodoList todoListTitle={tl.title} todoListId={tl.id} key={tl.id} tasks={tasksForTodoList}
                                     addTask={addTask} updateTaskStatus={updateTaskStatus}
                                     deleteTask={deleteTask}/>
                })}
            </div>
        </div>

    )
}

export default App;
