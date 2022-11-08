import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todoListsReducer} from "../reducers/todoListRedcuer";
import {tasksReducer} from "../reducers/tasksReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch




