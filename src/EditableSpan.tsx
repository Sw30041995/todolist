import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";

type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({title, ...props}: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(title)
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
        setError(false)
    }

    const changeTitle = () => {
        if (text.trim() === '') {
            setError(true)
            return
        }
        props.changeTitle(text)
        setEditMode(false)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') changeTitle()
    }

    return (
        <>
            {editMode ? <TextField variant="outlined" color='secondary'
                                   label={error ? 'Field cannot be empty' : 'Enter your text'} error={error}
                                   size='small' onKeyPress={onEnterPressHandler} autoFocus
                                   onBlur={changeTitle} onChange={onChangeTitleHandler} value={text}/> :
                <span title='Double click to edit' onDoubleClick={() => setEditMode(true)}>{title}</span>}
        </>
    )
}