import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {useAppDispatch, useAppSelector} from "./hooks";
import {createTodoList, getTodoLists} from "./reducers/todoListRedcuer";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(getTodoLists())
    }, [])

    const addTodoList = (todoListTitle: string) => {
        dispatch(createTodoList(todoListTitle))
    }

    return (
        <div>
            <header className='header'/>
            <div className='progressBar'>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <div className='App'>
                <div className='todosForm'>
                    <AddItemForm addItem={addTodoList} />
                </div>
                <div className='todoLists'>
                    {todoLists.map(tl => <TodoList key={tl.id} todoListTitle={tl.title} todoListId={tl.id}
                                                   entityTodoStatus={tl.entityStatus}/>)}
                </div>
            </div>
        </div>

    )
}

export default App;
