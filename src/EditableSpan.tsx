import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    changeTitle: (title: string) => void
}

export const EditableSpan = ({title, ...props}: PropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [text, setText] = useState(title)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    const changeTitle = () => {
        props.changeTitle(text)
        setEditMode(false)
    }


    return (
        <>
            {editMode ? <input autoFocus onBlur={changeTitle} onChange={onChangeTitleHandler} value={text}
                               type="text"/> :
                <span onDoubleClick={() => setEditMode(true)}>{title}</span>}
        </>
    )
}