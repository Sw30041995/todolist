import React, {SyntheticEvent} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert/Alert';
import {useAppDispatch, useAppSelector} from "./hooks";
import {setErrorAC} from "./reducers/appReducer";

export function ErrorSnackbar() {

    const dispatch = useAppDispatch()
    const error = useAppSelector(state => state.app.error)

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setErrorAC(''))
    }

    return (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} variant="filled" severity="error">
                {error}
            </Alert>
        </Snackbar>
    )
}