import {AppThunk} from "../store/store";
import {authAPI, LoginDataType} from "../todoListAPI/todoListAPI";
import {setAppStatusAC, setErrorAC} from "./appReducer";

export type AuthActionType = SetIsLoggedInActionType | InitializeAppActionType

const initialState: initialStateType = {
    isLoggedIn: false,
    isInitialized: false
}

type initialStateType = {
    isLoggedIn: boolean
    isInitialized: boolean
}

export const authReducer = (state = initialState, action: AuthActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }
        case "AUTH/INITIALIZE-APP": {
            return {...state, isInitialized: action.payload.isInitialized}
        }
        default: {
            return state
        }
    }
}

type InitializeAppActionType = ReturnType<typeof initializeApp>
type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

export const initializeApp = (isInitialized: boolean) => ({type: 'AUTH/INITIALIZE-APP', payload: {isInitialized}} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', payload: {isLoggedIn}} as const)

export const login = (loginData: LoginDataType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            } else if (res.data.resultCode === 1) {
                dispatch(setErrorAC(res.data.messages[0]))
            }
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const logoutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false))
            }
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(setAppStatusAC("idle"))
        })
}

export const initializeAppTC = (): AppThunk => (dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true))
            }
            //при любом неавторизованном переходе по сайту , даже на странице логин бцдет установлена ошибка
            // else if (res.data.resultCode === 1) {
            //     dispatch(setErrorAC(res.data.messages[0]))
            // }
        })
        .catch(e => {
            dispatch(setErrorAC(e.message))
        })
        .finally(() => {
            dispatch(initializeApp(true))
        })
}
