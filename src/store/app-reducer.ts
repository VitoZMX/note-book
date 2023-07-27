import {BaseThunkType, InferActionsTypes} from './store'
import {getAllNotesAction} from './notes-reducer'
import * as actionType from './actionTypes'
import {themeType} from '../types/types'
import {themeAPI} from '../api/theme-api'

let initialState = {
    initialized: true as boolean,
    theme: 'light' as themeType
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionType.INITIALIZED_SUCCESS:
            return {
                ...state,
                theme: action.theme,
                initialized: false
            }
        case actionType.SET_THEME:
            return {
                ...state,
                theme: action.theme,

            }
        default:
            return state
    }
}

export const actions = {
    initializedSuccess: (theme: themeType) => ({type: actionType.INITIALIZED_SUCCESS, theme: theme} as const),
    setTheme: (theme: themeType) => ({type: actionType.SET_THEME, theme: theme} as const)
}

export const initializeApp = () => async (dispatch: any) => {
    const themeStylePromise = themeAPI.getTheme()
    const notesPromise = dispatch(getAllNotesAction())

    Promise.all([themeStylePromise, notesPromise])
        .then(([themeStyle]) => {
            dispatch(actions.setTheme(themeStyle))
            dispatch(actions.initializedSuccess(themeStyle))
        })
}

export const replaceTheme = (theme: themeType): ThunkType => async (dispatch) => {
    dispatch(actions.setTheme(theme))
    await themeAPI.setTheme(theme)
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default appReducer