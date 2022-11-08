import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./hooks";
import {createTodoList, getTodoLists} from "./reducers/todoListRedcuer";

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    useEffect(() => {
        // @ts-ignore
        dispatch(getTodoLists())
    }, [])

    const addTodoList = (todoListTitle: string) => {
        // @ts-ignore
        dispatch(createTodoList(todoListTitle))
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => <TodoList key={tl.id} todoListTitle={tl.title} todoListId={tl.id}/>)}
        </div>

    )
}

export default App;
