import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListsActionType, todoListsReducer} from "../reducers/todoListReducer";
import {TasksActionsType, tasksReducer} from "../reducers/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "../reducers/appReducer";
import {authReducer} from "../reducers/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof store.getState>
// export type AppRootStateType = ReturnType<typeof rootReducer>

type AppActionsType = TasksActionsType | TodoListsActionType | AppActionType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>




