import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./hooks";
import {addTodoListAC, getTodoLists} from "./reducers/todoListRedcuer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    useEffect(() => {
        // @ts-ignore
        dispatch(getTodoLists())
    }, [])

    const addTodoList = (todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => {
                return <TodoList todoListTitle={tl.title} todoListId={tl.id} key={tl.id}/>
            })}
        </div>

    )
}

export default App;
