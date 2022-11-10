import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks";
import {getTodoLists} from "./reducers/todoListReducer";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {ErrorSnackbar} from "./ErrorSnackBar";
import {TodoListsList} from "./TodoListsList";
import {AppBar} from './AppBar';

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(getTodoLists())
    }, [])

    return (
        <div>
            <AppBar/>
            <div className='progressBar'>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <TodoListsList/>
            <ErrorSnackbar/>
        </div>

    )
}

export default App;
