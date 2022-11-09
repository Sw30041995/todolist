export type AppActionType = SetAppStatusActionType
type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: initialStateType = {
    status: 'loading'
}

type initialStateType = {
    status: AppStatusType
}

export const appReducer = (state = initialState, action: AppActionType): initialStateType => {
    switch (action.type) {
        case "APP/SET-APP-STATUS": {
            return {...state, status: action.payload.status}
        }
        default: {
            return state
        }
    }
}

type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>


export const setAppStatusAC = (status: AppStatusType) => ({
    type: 'APP/SET-APP-STATUS',
    payload: {status}
} as const)
