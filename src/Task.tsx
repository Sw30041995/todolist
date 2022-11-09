import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import {removeTask, TaskEntityStatusType, TaskType, updateTask} from "./reducers/tasksReducer";
import {useAppDispatch} from "./hooks";
import {TaskStatuses} from "./todoListAPI/todoListAPI";
import CircularProgress from "@mui/material/CircularProgress";

type PropsType = {
    todoListId: string
    task: TaskType
    entityStatus: TaskEntityStatusType
}

export const Task = memo(({task, todoListId, entityStatus}: PropsType) => {

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(removeTask(todoListId, task.id))
    }

    const changeTaskTitle = (taskTitle: string) => {
        dispatch(updateTask(todoListId, task.id, {title: taskTitle}))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(todoListId, task.id, {
            status: e.currentTarget.checked ?
                TaskStatuses.Completed : TaskStatuses.New
        }))
    }

    return (
        <div>
            <p>
                {entityStatus === 'checkboxLoading' ? <CircularProgress size="0.8rem" color="inherit"/> :
                    <input onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed}
                           type="checkbox"/>}
                <EditableSpan changeTitle={changeTaskTitle} title={task.title}/>
                <button disabled={entityStatus === 'buttonLoading'} onClick={deleteTask}>X</button>
            </p>
        </div>
    )
})