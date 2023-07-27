import React, {FC, useCallback, useState} from 'react'
import Card from '@mui/material/Card'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DoneIcon from '@mui/icons-material/Done'
import CloseIcon from '@mui/icons-material/Close'
import {INoteType} from '../../../types/types'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'
import s from './NoteItem.module.sass'
import TextField from '@mui/material/TextField'
import {parseNoteData} from '../../../utils/utils'
import Box from '@mui/material/Box'
import {TextNoteItem} from './TextNoteItem/TextNoteItem'

type NoteItemPropsType = {
    note: INoteType
    delNote: (note: INoteType) => void
    editNote: (note: INoteType) => void
}

export const NoteItem: FC<NoteItemPropsType> = ({note, delNote, editNote}) => {
    const NoteTextTag = `${note.text} ${note.tag}`
    const [editMode, setEditMode] = useState<boolean>(false)
    const [noteTextValue, setNoteTextValue] = useState<string>(NoteTextTag)
    const dispatch: Dispatch<any> = useDispatch()

    const deleteNote = useCallback(
        (note: INoteType) => dispatch(delNote(note)),
        [dispatch, delNote]
    )

    const addEditedNote = useCallback(
        (note: INoteType) => dispatch(editNote(note)),
        [dispatch, editNote]
    )

    const handleClickEditMode = () => {
        if (editMode && noteTextValue !== NoteTextTag) {
            if (!noteTextValue.trim()) {
                setNoteTextValue(NoteTextTag)
            } else {
                addEditedNote(parseNoteData(noteTextValue, note.id))
            }
        }
        setEditMode(!editMode)
    }

    const handleClickCloseEditMode = () => {
        setNoteTextValue(NoteTextTag)
        setEditMode(false)
    }

    const handleChangeValueEditNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoteTextValue(e.target.value)
    }

    return (
        <Card className={s.container}>
            {editMode ? (
                <TextField multiline className={s.textField} minRows={1} maxRows={4}
                           value={noteTextValue} variant="standard" onChange={handleChangeValueEditNote}/>
            ) : (
                <TextNoteItem text={note.text} tag={note.tag}/>
            )}

            <Box className={s.btnGroup}>
                <IconButton onClick={handleClickEditMode}>
                    {editMode ? <DoneIcon color="success"/> : <ModeEditIcon color="primary"/>}
                </IconButton>
                {editMode ? <IconButton onClick={handleClickCloseEditMode}><CloseIcon color="warning"/></IconButton>
                    : <IconButton onClick={() => deleteNote(note)}><DeleteForeverIcon color="primary"/></IconButton>}
            </Box>
        </Card>
    )
}