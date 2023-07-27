import React, {FC, useCallback, useState} from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import {INoteType} from '../../../types/types'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'
import {parseNoteData} from '../../../utils/utils'

type CreateNewNotePropsType = {
    addNote: (newNote: INoteType) => void
}

export const CreateNewNote: FC<CreateNewNotePropsType> = ({addNote}) => {
    const [newNoteText, setNewNoteText] = useState('')
    const dispatch: Dispatch<any> = useDispatch()

    const CreateNote = useCallback(
        (note: INoteType) => dispatch(addNote(note)),
        [dispatch, addNote]
    )

    const handleChangeValueTextNewNote = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNoteText(e.target.value)
    }

    const handleClickCreateNewNote = () => {
        if (!newNoteText.trim()) {
            setNewNoteText('')
            return
        }
        setNewNoteText('')
        CreateNote(parseNoteData(newNoteText))
    }

    return (
        <Grid container spacing={2}>
            <Grid item>
                <TextField
                    label="Новая заметка"
                    size="small"
                    value={newNoteText}
                    onChange={handleChangeValueTextNewNote}/>
            </Grid>

            <Grid item>
                <Button style={{height: '100%'}} variant="outlined" aria-label="add"
                        onClick={handleClickCreateNewNote} color="primary" startIcon={<AddCircleOutlineIcon/>}>
                    Создать заметку
                </Button>
            </Grid>
        </Grid>
    )
}