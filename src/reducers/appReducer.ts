export type AppActionType = SetAppStatusActionType | SetErrorActionType
type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'loading',
    error: ''
}

type initialStateType = {
    status: AppStatusType
    error: string
}

export const appReducer = (state = initialState, action: AppActionType): initialStateType => {
    switch (action.type) {
        case "APP/SET-APP-STATUS": {
            return {...state, status: action.payload.status}
        }
        case "APP/SET-ERROR": {
            return {...state, error: action.payload.error}
        }
        default: {
            return state
        }
    }
}

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetErrorActionType = ReturnType<typeof setErrorAC>


export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS', payload: {status}} as const)
export const setErrorAC = (error: string) => ({type: 'APP/SET-ERROR', payload: {error}} as const)
