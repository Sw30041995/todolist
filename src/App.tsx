import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./hooks";
import {addTodoListAC} from "./reducers/todoListRedcuer";

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
    console.log('APP')

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    const addTodoList = (todoListTitle: string) => {
        dispatch(addTodoListAC(todoListTitle))
    }

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map(tl => <TodoList key={tl.id} todoListTitle={tl.title} todoListId={tl.id}/>)}
        </div>

    )
}

export default App;
