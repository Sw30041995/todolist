import React from 'react';
import {TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";

type PropsType = {
    todoListId: string
    task: TaskType
    updateTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, taskTitle: string) => void
}

export const Task = ({task, updateTaskStatus, deleteTask, todoListId, changeTaskTitle}: PropsType) => {

    const changeTaskTitleWrapper = (taskTitle: string) => {
        changeTaskTitle(todoListId, task.id, taskTitle)
    }

    return (
        <div>
            <p>
                <EditableSpan changeTitle={changeTaskTitleWrapper} title={task.title}/>
                <input onChange={() => updateTaskStatus(todoListId, task.id, !task.isDone)} checked={task.isDone}
                       type="checkbox"/>
                <button onClick={() => deleteTask(todoListId, task.id)}>X</button>
            </p>
        </div>
    )
}