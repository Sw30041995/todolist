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

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ])

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const updateTaskStatus = (taskId: string, taskStatus: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t))
    }

    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
    }

    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    let tasksForTodoList = tasks
    if (tasksFilter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (tasksFilter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div>
            <TodoList tasks={tasksForTodoList} addTask={addTask} updateTaskStatus={updateTaskStatus}
                      deleteTask={deleteTask} changeTaskFilter={changeTaskFilter}/>
        </div>
    )
}

export default App;
