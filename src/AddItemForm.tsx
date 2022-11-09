import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

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
            <TextField error={error} size='small' label={error ? 'Field cannot be empty' : 'Enter your text'}
                       color='secondary'
                       onKeyPress={onEnterPressHandler}
                       onChange={onInputChangeHandler} value={title} variant="outlined"/>
            <button onClick={addItemWrapper}>+</button>
        </div>
    )
}
