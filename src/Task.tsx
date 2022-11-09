import React, {ChangeEvent, memo} from 'react';
import {EditableSpan} from "./EditableSpan";
import {removeTask, TaskEntityStatusType, TaskType, updateTask} from "./reducers/tasksReducer";
import {useAppDispatch} from "./hooks";
import {TaskStatuses} from "./todoListAPI/todoListAPI";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Checkbox, IconButton} from "@mui/material";

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
                {entityStatus === 'checkboxLoading' ? <CircularProgress size="1.1rem" color="inherit"/> :
                <Checkbox onChange={onChangeHandler} checked={task.status === TaskStatuses.Completed} color="secondary" />}
                <EditableSpan changeTitle={changeTaskTitle} title={task.title}/>
                <IconButton onClick={deleteTask} color='inherit' disabled={entityStatus === 'buttonLoading'}>
                    <DeleteForeverIcon fontSize="small" />
                </IconButton>
            </p>
        </div>
    )
})