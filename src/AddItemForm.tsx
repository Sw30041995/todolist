import React, {ChangeEvent, useState} from 'react';

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

    return (
        <div>
            <input className={error ? 'errorInput' : ''} onChange={onInputChangeHandler} value={title} type="text"/>
            <button onClick={addItemWrapper}>+</button>
            {error && <p className='error'>Title Required!</p>}
        </div>
    )
}
