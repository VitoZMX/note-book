import * as actionType from './actionTypes'
import {INoteType } from '../types/types'
import {BaseThunkType, InferActionsTypes} from './store'
import {notesAPI} from '../api/notes-api'

const initialState  = {
    notes: [] as Array<INoteType>,
    tagFilter: [] as Array<string>,
}

const notesReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case actionType.ADD_NOTE:
            const newNote :INoteType = {
                id: action.note.id,
                text: action.note.text,
                tag: action.note.tag,
            }
            return {
                ...state,
                notes: state.notes.concat(newNote),
            }
        case actionType.ADD_TAG:
            return {
                ...state,
                tagFilter: action.tags,
            }
        case actionType.ADD_EDIT_NOTE:
            const updatedNotesAfterEditing = state.notes.map(note => {
                if (note.id === action.note.id) {
                    return {
                        ...note,
                        text: action.note.text,
                        tag: action.note.tag
                    }
                }
                return note
            })
            return {
                ...state,
                notes: updatedNotesAfterEditing
            }
        case actionType.REMOVE_NOTE:
            const updatedNotesAfterRemove: INoteType[] = state.notes.filter(
                note => note.id !== action.note.id
            )
            return {
                ...state,
                notes: updatedNotesAfterRemove,
            }
        case actionType.SET_ALL_NOTES:
            return {
                ...state,
                notes: action.notes,
            }
        default:
            return state
    }
}

export const actions = {
    setAllNotesAction: (notes: INoteType[]) => ({type: actionType.SET_ALL_NOTES, notes: notes} as const),
    setNewNoteAction: (note: INoteType) => ({type: actionType.ADD_NOTE, note: note} as const),
    setEditNoteAction: (note: INoteType) => ({type: actionType.ADD_EDIT_NOTE, note: note} as const),
    deleteNoteAction: (note: INoteType) => ({type: actionType.REMOVE_NOTE, note: note} as const),
    setTagFilterNoteAction: (tags: string[]) => ({type: actionType.ADD_TAG, tags: tags,} as const),
}

export const getAllNotesAction = (): ThunkType => async (dispatch) => {
    let notes = await notesAPI.getAllNotes()
    dispatch(actions.setAllNotesAction(notes))
}

export const addNote = (note: INoteType): ThunkType => async (dispatch) => {
    await notesAPI.setNote(note)
    dispatch(actions.setNewNoteAction((note)))
}

export const addEditNote = (note: INoteType): ThunkType => async (dispatch) => {
    await notesAPI.setEditedNote(note)
    dispatch(actions.setEditNoteAction(note))
}

export const removeNote = (note: INoteType): ThunkType => async (dispatch) => {
    await notesAPI.delNote(note.id)
    dispatch(actions.deleteNoteAction(note))
}

export const addTagFilter = (tags: string[]): ThunkType => async (dispatch) => {
    dispatch(actions.setTagFilterNoteAction(tags))
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

export default notesReducer