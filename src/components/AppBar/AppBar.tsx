import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {logoutTC} from "../../reducers/authReducer";

export const AppBar = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const logout = () => dispatch(logoutTC())

    return (
        <header className='header'>
            {isLoggedIn && <h2 onClick={logout}>Logout</h2>}
        </header>
    )
}