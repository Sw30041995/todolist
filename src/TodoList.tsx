import React, {useCallback, useState} from 'react';
import {FilterValueType} from "./App";
import {Task} from "./Task";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "./hooks";
import {addTaskAC} from "./reducers/tasksReducer";
import {changeTodoListTitleAC, deleteTodoListAC} from "./reducers/todoListRedcuer";

type PropsType = {
    todoListTitle: string
    todoListId: string
}

export const TodoList = ({todoListId, todoListTitle}: PropsType) => {
    console.log('TODOLIST')
    const dispatch = useAppDispatch()
    const tasks = useAppSelector(state => state.tasks)

    const [tasksFilter, setTasksFilter] = useState<FilterValueType>('all')

    const addTask = useCallback((taskTitle: string) => {
        dispatch(addTaskAC(todoListId, taskTitle))
    }, [])
    const deleteTodoList = (todoListId: string) => {
        dispatch(deleteTodoListAC(todoListId))
    }
    const changeTodoListTitle = useCallback((todoListTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, todoListTitle))
    }, [])

    const changeTaskFilter = (filter: FilterValueType) => {
        setTasksFilter(filter)
    }

    let tasksForTodoList = tasks[todoListId]
    if (tasksFilter === 'active') {
        tasksForTodoList = tasks[todoListId].filter(t => !t.isDone)
    }
    if (tasksFilter === 'completed') {
        tasksForTodoList = tasks[todoListId].filter(t => t.isDone)
    }

    return (
        <div>
            <h3>
                <EditableSpan changeTitle={changeTodoListTitle} title={todoListTitle}/>
                <button onClick={() => deleteTodoList(todoListId)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {tasksForTodoList.map(t => <Task key={t.id} todoListId={todoListId} task={t}/>)}
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

