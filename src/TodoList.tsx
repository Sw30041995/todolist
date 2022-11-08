import React, {useEffect, useState} from 'react';
import {FilterValueType} from "./App";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "./hooks";
import {deleteTodoList, updateTodoListTitle} from "./reducers/todoListRedcuer";
import {TaskStatuses} from "./todoListAPI/todoListAPI";
import {createTask, getTasks} from "./reducers/tasksReducer";

type PropsType = {
    todoListTitle: string
    todoListId: string
}

export const TodoList = ({todoListId, todoListTitle}: PropsType) => {

    useEffect(() => {
        // @ts-ignore
        dispatch(getTasks(todoListId))
    }, [])

    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const addTask = (taskTitle: string) => {
        // @ts-ignore
        dispatch(createTask(todoListId, taskTitle))
    }
    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    const removeTodoList = () => {
        // @ts-ignore
        dispatch(deleteTodoList(todoListId))
    }
    const changeTodoListTitle = (todoListTitle: string) => {
        // @ts-ignore
        dispatch(updateTodoListTitle(todoListId, todoListTitle))
    }

    let tasksForTodoLists = tasks[todoListId]
    if (tasksFilter === 'active') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.New)
    } else if (tasksFilter === 'completed') {
        tasksForTodoLists = tasks[todoListId].filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={todoListTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksForTodoLists && tasksForTodoLists.map(t => <Task key={t.id} todoListId={todoListId} task={t}/>)}
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
        </div>
    )
}

