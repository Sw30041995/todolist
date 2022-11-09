import React, {useEffect, useState} from 'react';
import {FilterValueType} from "./App";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "./hooks";
import {deleteTodoList, updateTodoListTitle} from "./reducers/todoListRedcuer";
import {TaskStatuses} from "./todoListAPI/todoListAPI";
import {createTask, getTasks} from "./reducers/tasksReducer";
import ButtonGroup from '@mui/material/ButtonGroup/ButtonGroup';
import Button from '@mui/material/Button/Button';

type PropsType = {
    todoListTitle: string
    todoListId: string
    entityTodoStatus: boolean
}

export const TodoList = ({todoListId, todoListTitle, entityTodoStatus}: PropsType) => {

    useEffect(() => {
        dispatch(getTasks(todoListId))
    }, [])

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const addTask = (taskTitle: string) => {
        dispatch(createTask(todoListId, taskTitle))
    }
    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    const removeTodoList = () => {
        dispatch(deleteTodoList(todoListId))
    }
    const changeTodoListTitle = (todoListTitle: string) => {
        dispatch(updateTodoListTitle(todoListId, todoListTitle))
    }

    let tasksForTodoLists = tasks[todoListId]
    if (tasksFilter === 'active') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.New)
    } else if (tasksFilter === 'completed') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className='todoList'>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={todoListTitle}/>
                <button disabled={entityTodoStatus} onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksForTodoLists && tasksForTodoLists.map(t => <Task key={t.id} entityStatus={t.entityStatus}
                                                                   todoListId={todoListId} task={t}/>)}
            <div>
                <ButtonGroup color="secondary">
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

