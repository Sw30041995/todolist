import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setTitle] = useState('')

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div>
            <input onChange={onInputChangeHandler} value={title} type="text"/>
            <button onClick={() => addItem(title)}>+</button>
        </div>
    )
}
