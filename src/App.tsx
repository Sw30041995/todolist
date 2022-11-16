import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {ErrorSnackbar} from "./ErrorSnackBar";
import {TodoListsList} from "./TodoListsList";
import {AppBar} from './AppBar';
import {Route, Routes} from 'react-router-dom';
import {Login} from './Login';
import {initializeAppTC} from "./reducers/authReducer";
import {CircularProgress} from "@mui/material";

export type FilterValueType = 'all' | 'completed' | 'active'

function App() {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return (
            <div className='appCircularProgress'>
                <CircularProgress color='inherit'/>
            </div>
        )
    }

    return (
        <div className='App'>
            <AppBar/>
            <div className='progressBar'>
                {status === 'loading' && <LinearProgress color="secondary"/>}
            </div>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/' element={<TodoListsList/>}/>
            </Routes>
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
