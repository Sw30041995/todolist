import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";
import AddIcon from '@mui/icons-material/Add';
import {IconButton} from "@mui/material";

type PropsType = {
    addItem: (title: string) => void
    TodoEntityStatus?: boolean
}

export const AddItemForm = ({addItem, TodoEntityStatus}: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const addItemWrapper = () => {
        if (!title.trim()) {
            setError(true)
            return
        }
        addItem(title.trim())
        setTitle('')
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') addItemWrapper()
    }

    return (
        <div>
            <TextField disabled={TodoEntityStatus} error={error} size='small'
                       label={error ? 'Field cannot be empty' : 'Enter your text'}
                       color='secondary'
                       onKeyPress={onEnterPressHandler}
                       onChange={onInputChangeHandler} value={title} variant="outlined"/>
            <IconButton onClick={addItemWrapper} color='inherit'>
                <AddIcon/>
            </IconButton>
        </div>
    )
}
