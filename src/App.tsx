import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {v1} from "uuid";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false}
    ])
    const [title, setTitle] = useState('')
    const [tasksStatus, setTasksStatus] = useState<FilterValueType>('all')

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const updateTaskStatus = (taskId: string, taskStatus: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: taskStatus} : t))
    }

    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
        setTitle('')
    }

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    let tasksForTodoList = tasks
    if (tasksStatus === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    } else if (tasksStatus === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    return (
        <div className="App">
            <h3>What to learn?</h3>
            <input onChange={onInputChangeHandler} type="text" value={title}/>
            <button onClick={() => addTask(title)}>+</button>
            <div>
                {tasksForTodoList.map(t => <p key={t.id}>{t.title}
                    <input onChange={() => updateTaskStatus(t.id, !t.isDone)} checked={t.isDone} type="checkbox"/>
                    <button onClick={() => deleteTask(t.id)}>X</button>
                </p>)}
            </div>
            <div>
                <button onClick={() => setTasksStatus('all')}>All</button>
                <button onClick={() => setTasksStatus('active')}>Active</button>
                <button onClick={() => setTasksStatus('completed')}>Completed</button>
            </div>
        </div>
    )
}

export default App;
