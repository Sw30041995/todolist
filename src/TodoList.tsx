import React, {useEffect, useState} from 'react';
import {FilterValueType} from "./App";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "./hooks";
import {deleteTodoList, TodoEntityStatusType, updateTodoListTitle} from "./reducers/todoListReducer";
import {TaskStatuses} from "./todoListAPI/todoListAPI";
import {createTask, getTasks} from "./reducers/tasksReducer";
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Button from '@mui/material/Button/Button';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {IconButton} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

type PropsType = {
    todoListTitle: string
    todoListId: string
    todoEntityStatus: TodoEntityStatusType
}

export const TodoList = ({todoListId, todoListTitle, todoEntityStatus}: PropsType) => {

    useEffect(() => {
        dispatch(getTasks(todoListId))
    }, [])

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)
    const lockEditMode = todoEntityStatus === "buttonLoading"

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const addTask = (taskTitle: string) => dispatch(createTask(todoListId, taskTitle))
    const changeTaskFilter = (filter: FilterValueType) => setTasksFilter(filter)

    const removeTodoList = () => dispatch(deleteTodoList(todoListId))
    const changeTodoListTitle = (todoListTitle: string) => dispatch(updateTodoListTitle(todoListId, todoListTitle))

    let tasksForTodoLists = tasks[todoListId]
    if (tasksFilter === 'active') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.New)
    } else if (tasksFilter === 'completed') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className='todoList'>
                {todoEntityStatus === 'titleLoading' ?
                    <h3 className='todoLoader'>
                        <CircularProgress size="1.5rem" color="inherit"/>
                    </h3> :
                    <h3 className='todoTitle'>
                        <EditableSpan lockEditMode={lockEditMode} changeTitle={changeTodoListTitle} title={todoListTitle}/>
                        <IconButton onClick={removeTodoList} color='inherit'
                                    disabled={todoEntityStatus === 'buttonLoading'}>
                            <DeleteForeverIcon fontSize="medium"/>
                        </IconButton>
                    </h3>}
            <AddItemForm addItem={addTask} TodoEntityStatus={todoEntityStatus === 'buttonLoading'}/>
            {tasksForTodoLists && tasksForTodoLists.map(t => <Task key={t.id} todoListId={todoListId} task={t}/>)}
            <div className='filterButtons'>
                <ButtonGroup size='small' color="secondary">
                    <Button variant={tasksFilter === "all" ? 'contained' : 'outlined'}
                            onClick={() => changeTaskFilter('all')}>All</Button>
                    <Button variant={tasksFilter === "active" ? 'contained' : 'outlined'}
                            onClick={() => changeTaskFilter('active')}>Active</Button>
                    <Button variant={tasksFilter === "completed" ? 'contained' : 'outlined'}
                            onClick={() => changeTaskFilter('completed')}>Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

