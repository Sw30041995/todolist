import React, {useEffect} from 'react';
import {AddItemForm} from "../../common components/AddItemForm";
import {TodoList} from "./TodoList/TodoList";
import {createTodoList, getTodoLists} from "../../reducers/todoListReducer";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Navigate} from 'react-router-dom';

export const TodoListsList = () => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getTodoLists())
        }
    }, [])

    const addTodoList = (todoListTitle: string) => dispatch(createTodoList(todoListTitle))

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return (
        <div className='todoListsList'>
            <div className='todosForm'>
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div className='todoLists'>
                {todoLists.map(tl => <TodoList key={tl.id} todoListTitle={tl.title} todoListId={tl.id}
                                               todoEntityStatus={tl.entityStatus}/>)}
            </div>
        </div>
    )
}