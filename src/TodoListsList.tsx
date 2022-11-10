import React from 'react';
import {AddItemForm} from "./AddItemForm";
import {TodoList} from "./TodoList";
import {createTodoList} from "./reducers/todoListReducer";
import {useAppDispatch, useAppSelector} from "./hooks";

export const TodoListsList = () => {

    const dispatch = useAppDispatch()
    const todoLists = useAppSelector(state => state.todoLists)

    const addTodoList = (todoListTitle: string) => {
        dispatch(createTodoList(todoListTitle))
    }

    return (
        <div className='App'>
            <div className='todosForm'>
                <AddItemForm addItem={addTodoList}/>
            </div>
            <div className='todoLists'>
                {todoLists.map(tl => <TodoList key={tl.id} todoListTitle={tl.title} todoListId={tl.id}
                                               entityTodoStatus={tl.entityStatus}/>)}
            </div>
        </div>
    )
}