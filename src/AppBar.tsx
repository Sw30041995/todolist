import React from 'react';
import {NavLink} from "react-router-dom";

export const AppBar = () => {
    return (
        <header className='header'>
            <NavLink to='/login'><h2>Login</h2></NavLink>
        </header>
    )
}