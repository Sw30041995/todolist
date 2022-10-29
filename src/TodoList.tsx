import React, {ChangeEvent, useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import {Task} from "./Task";

type PropsType = {
    todoListTitle: string
    todoListId: string
    tasks: TaskType[]
    addTask: (todoListId: string, taskTitle: string) => void
    updateTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
}

export const TodoList = ({tasks, deleteTask, updateTaskStatus, todoListId, todoListTitle, ...props}: PropsType) => {

    const [title, setTitle] = useState('')
    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.addTask(todoListId, title)
    }

    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    if (tasksFilter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    } else if (tasksFilter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    return (
        <>
            <h3>{todoListTitle}</h3>
            <input onChange={onInputChangeHandler} type="text" value={title}/>
            <button onClick={addTask}>+</button>
            {tasks.map(t => <Task key={t.id} todoListId={todoListId} task={t} updateTaskStatus={updateTaskStatus}
                                  deleteTask={deleteTask}/>)}
            <div>
                <button onClick={() => changeTaskFilter('all')}>All</button>
                <button onClick={() => changeTaskFilter('active')}>Active</button>
                <button onClick={() => changeTaskFilter('completed')}>Completed</button>
            </div>
        </>
    )
}

