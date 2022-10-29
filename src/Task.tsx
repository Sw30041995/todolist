import React, {memo, useCallback} from 'react';
import {TaskType} from "./App";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch} from "./hooks";
import {changeTaskTitleAC, deleteTaskAC, updateTaskStatusAC} from "./reducers/tasksReducer";

type PropsType = {
    todoListId: string
    task: TaskType
}

export const Task = memo(({task, todoListId}: PropsType) => {

    console.log('TASK')

    const dispatch = useAppDispatch()

    const deleteTask = (todoListId: string) => {
        dispatch(deleteTaskAC(todoListId, task.id))
    }
    const updateTaskStatus = (todoListId: string, taskStatus: boolean) => {
        dispatch(updateTaskStatusAC(todoListId, task.id, taskStatus))
    }
    const changeTaskTitle = useCallback((taskTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, task.id, taskTitle))
    }, [])

    return (
        <div>
            <p>
                <EditableSpan changeTitle={changeTaskTitle} title={task.title}/>
                <input onChange={() => updateTaskStatus(todoListId, !task.isDone)} checked={task.isDone}
                       type="checkbox"/>
                <button onClick={() => deleteTask(todoListId)}>X</button>
            </p>
        </div>
    )
})