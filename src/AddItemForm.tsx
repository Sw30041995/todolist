import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: PropsType) => {
    console.log('AddItemForm')
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
            <input className={error ? 'errorInput' : ''} onKeyPress={onEnterPressHandler}
                   onChange={onInputChangeHandler} value={title} type="text"/>
            <button onClick={addItemWrapper}>+</button>
            {error && <p className='error'>Title Required!</p>}
        </div>
    )
})