import React from 'react';
import {TaskType} from "./App";

type PropsType = {
    todoListId: string
    task: TaskType
    updateTaskStatus: (todoListId: string, taskId: string, taskStatus: boolean) => void
    deleteTask: (todoListId: string, taskId: string) => void
}

export const Task = ({task, updateTaskStatus, deleteTask, todoListId}: PropsType) => {

    return (
        <div>
            <p>{task.title}
                <input onChange={() => updateTaskStatus(todoListId, task.id, !task.isDone)} checked={task.isDone}
                       type="checkbox"/>
                <button onClick={() => deleteTask(todoListId, task.id)}>X</button>
            </p>
        </div>
    )
}