import React, {useState} from 'react';
import {FilterValueType, TaskType} from "./App";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    todoListTitle: string
    todoListId: string
    tasks: TaskType[]
    deleteTodoList: (todoListId: string) => void
    addTask: (todoListId: string, taskTitle: string) => void
    updateTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
    changeTodoListTitle: (todoListId: string, todoListTitle: string) => void
}

export const TodoList = ({tasks, deleteTask, updateTaskStatus, todoListId, todoListTitle, changeTaskTitle, deleteTodoList, ...props}: PropsType) => {

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const addTask = (taskTitle: string) => {
        props.addTask(todoListId, taskTitle)
    }

    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    if (tasksFilter === 'active') {
        tasks = tasks.filter(t => !t.isDone)
    } else if (tasksFilter === 'completed') {
        tasks = tasks.filter(t => t.isDone)
    }

    const changeTodoListTitle = (todoListTitle: string) => {
        props.changeTodoListTitle(todoListId, todoListTitle)
    }

    return (
        <>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={todoListTitle}/>
                <button onClick={() => deleteTodoList(todoListId)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasks.map(t => <Task key={t.id} changeTaskTitle={changeTaskTitle} todoListId={todoListId} task={t}
                                  updateTaskStatus={updateTaskStatus}
                                  deleteTask={deleteTask}/>)}
            <div>
                <button className={tasksFilter === "all" ? 'activeButton' : ''}
                        onClick={() => changeTaskFilter('all')}>All
                </button>
                <button className={tasksFilter === "active" ? 'activeButton' : ''}
                        onClick={() => changeTaskFilter('active')}>Active
                </button>
                <button className={tasksFilter === "completed" ? 'activeButton' : ''}
                        onClick={() => changeTaskFilter('completed')}>Completed
                </button>
            </div>
        </>
    )
}

