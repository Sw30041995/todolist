export type AppActionType = SetLoginActionType

const initialState: initialStateType = {
    isLoggedIn: false
}

type initialStateType = {
    isLoggedIn: boolean
}

export const authReducer = (state = initialState, action: AppActionType): initialStateType => {
    switch (action.type) {
        case "AUTH/SET-LOGIN": {
            return {...state, isLoggedIn: action.payload.isLoggedIn}
        }
        default: {
            return state
        }
    }
}

type SetLoginActionType = ReturnType<typeof setLoginAC>

export const setLoginAC = (isLoggedIn: boolean) => ({type: 'AUTH/SET-LOGIN', payload: {isLoggedIn}} as const)
