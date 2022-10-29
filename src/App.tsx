import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./hooks";
import {addTaskAC, changeTaskTitleAC, deleteTaskAC, updateTaskStatusAC} from "./reducers/tasksReducer";
import {addTodoListAC, changeTodoListTitleAC, deleteTodoListAC} from "./reducers/todoListRedcuer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'completed' | 'active'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    const deleteTask = (todoListId: string, taskId: string) => {
        dispatch(deleteTaskAC(todoListId, taskId))
    }

    const updateTaskStatus = (todoListId: string, taskId: string, taskStatus: boolean) => {
        dispatch(updateTaskStatusAC(todoListId, taskId, taskStatus))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, taskTitle: string) => {
        dispatch(changeTaskTitleAC(todoListId, taskId, taskTitle))
    }

    const addTask = (todoListId: string, taskTitle: string) => {
        dispatch(addTaskAC(todoListId, taskTitle))
    }

    const deleteTodoList = (todoListId: string) => {
        dispatch(deleteTodoListAC(todoListId))
    }

    const changeTodoListTitle = (todoListId: string, todoListTitle: string) => {
        dispatch(changeTodoListTitleAC(todoListId, todoListTitle))
    }

    const addTodoList = (todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }

    const addTodoListWrapper = (todoListTitle: string) => {
        addTodoList(todoListTitle)
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoListWrapper}/>
            {todoLists.map(tl => {
                return <TodoList changeTaskTitle={changeTaskTitle} todoListTitle={tl.title} todoListId={tl.id}
                                 key={tl.id}
                                 addTask={addTask} updateTaskStatus={updateTaskStatus}
                                 deleteTask={deleteTask} deleteTodoList={deleteTodoList}
                                 changeTodoListTitle={changeTodoListTitle}/>
            })}
        </div>

    )
}

export default App;
