import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import {removeTask, updateTask} from "./reducers/tasksReducer";
import {useAppDispatch} from "./hooks";
import {TaskStatuses, TaskType} from "./todoListAPI/todoListAPI";

type PropsType = {
    todoListId: string
    task: TaskType
}

export const Task = memo(({task, todoListId}: PropsType) => {

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        // @ts-ignore
        dispatch(removeTask(todoListId, task.id))
    }

    const changeTaskTitle = (taskTitle: string) => {
        // @ts-ignore
        dispatch(updateTask(todoListId, task.id, {title: taskTitle}))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        dispatch(updateTask(todoListId, task.id, {
            status: e.currentTarget.checked ?
                TaskStatuses.Completed : TaskStatuses.New
        }))
    }

    return (
        <div>
            <p>
                <input onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed} type="checkbox"/>
                <EditableSpan changeTitle={changeTaskTitle} title={task.title}/>
                <button onClick={deleteTask}>X</button>
            </p>
        </div>
    )
})