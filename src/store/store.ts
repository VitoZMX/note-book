import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import notesReducer from './notes-reducer'
import appReducer from './app-reducer'
import thunk, {ThunkAction} from 'redux-thunk'

export const rootReducer = combineReducers({
    app: appReducer,
    notes: notesReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type AppDispatch = typeof store.dispatch
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>