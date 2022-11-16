import Button from '@mui/material/Button/Button';
import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./hooks";
import {LoginDataType} from "./todoListAPI/todoListAPI";
import Checkbox from '@mui/material/Checkbox/Checkbox';
import {login} from "./reducers/authReducer";

type ErrorsType = {
    email: string
    password: string
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const validate = (values: LoginDataType) => {
        const errors = {} as ErrorsType
        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 5) {
            errors.password = 'Must be at least 5 characters'
        }
        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: (values: LoginDataType) => {
            dispatch(login(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <form className='form' onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email Address:</label>
                <div className='inputBlock'>
                    <TextField color='secondary' id="email" type="text" label='Email'
                               {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email &&
                    <span className='loginError'>{formik.errors.email}</span>}
                </div>


                <label htmlFor="password">Password:</label>
                <div className='inputBlock'>
                    <TextField color='secondary' id="password" type="password" label='Password'
                               {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password &&
                    <span className='loginError'>{formik.errors.password}</span>}
                </div>

                <div className='checkboxBlock'>
                    <label htmlFor="rememberMe">Remember me:</label>
                    <Checkbox color="secondary" id="rememberMe" name="rememberMe"
                              onChange={formik.handleChange}
                              checked={formik.values.rememberMe}/>
                </div>

                <Button variant="contained" color='secondary' type="submit">Login</Button>

            </form>
        </div>
    )
}

