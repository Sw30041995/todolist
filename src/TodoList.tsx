import React, {ChangeEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";

type PropsType = {
    tasks: TaskType[]
    changeTaskFilter: (filter: FilterValueType) => void
    addTask: (taskTitle: string) => void
    updateTaskStatus: (taskId: string, taskStatus: boolean) => void
    deleteTask: (taskId: string) => void
}

export const TodoList = ({tasks, changeTaskFilter, addTask, deleteTask, updateTaskStatus}: PropsType) => {

    const [title, setTitle] = useState('')

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div className="App">
            <h3>What to learn?</h3>
            <input onChange={onInputChangeHandler} type="text" value={title}/>
            <button onClick={() => addTask(title)}>+</button>
            <div>
                {tasks.map(t => <p key={t.id}>{t.title}
                    <input onChange={() => updateTaskStatus(t.id, !t.isDone)} checked={t.isDone} type="checkbox"/>
                    <button onClick={() => deleteTask(t.id)}>X</button>
                </p>)}
            </div>
            <div>
                <button onClick={() => changeTaskFilter('all')}>All</button>
                <button onClick={() => changeTaskFilter('active')}>Active</button>
                <button onClick={() => changeTaskFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}

