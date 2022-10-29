import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = memo(({title, ...props}: PropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(title)
    const [error, setError] = useState(false)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
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
            {editMode ? <input onKeyPress={onEnterPressHandler} className={error ? 'errorInput' : ''} autoFocus
                               onBlur={changeTitle}
                               onChange={onChangeTitleHandler} value={text}
                               type="text"/> :
                <span onDoubleClick={() => setEditMode(true)}>{title}</span>}
        </>
    )
})