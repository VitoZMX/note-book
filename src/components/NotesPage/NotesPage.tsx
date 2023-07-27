import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {NoteItem} from './NoteItem/NoteItem'
import {FilterTags} from './FilterTags/FilterTags'
import {CreateNewNote} from './CreateNewNote/CreateNewNote'
import {INoteType} from '../../types/types'
import {FC} from 'react'
import {filterNotesByTags} from '../../utils/utils'
import {shallowEqual, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {addEditNote, addNote, addTagFilter, removeNote} from '../../store/notes-reducer'

type NotesPagePropsType = {}

export const NotesPage: FC<NotesPagePropsType> = () => {

    const tags: string[] = useSelector(
        (state: AppStateType) => state.notes.tagFilter,
        shallowEqual
    )

    const notes: INoteType[] = useSelector(
        (state: AppStateType) => state.notes.notes,
        shallowEqual
    )

    const VisibleNotes = filterNotesByTags(notes, tags)

    return (
        <Box sx={{mb: 5}}>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в наш сервис заметок!
            </Typography>

            <Grid container spacing={2} sx={{mb: 5}}>
                <Grid item xs={12} sm={6} lg={5} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Создание заметок
                    </Typography>
                    <CreateNewNote addNote={addNote}/>
                </Grid>

                <Grid item xs={12} sm={6} lg={7} md={6}>
                    <Typography variant="h6" gutterBottom>
                        Фильтрация заметок по тегу
                    </Typography>
                    <FilterTags addTagFilter={addTagFilter} tags={notes.map((note) => note.tag)}/>
                </Grid>
            </Grid>

            <Box>
                <Typography variant="h6" gutterBottom>
                    Список заметок
                </Typography>

                <Grid container spacing={2}>
                    {VisibleNotes.map((note) => (
                        <Grid key={note.id} item xs={12} sm={6} md={4}>
                            <NoteItem note={note} editNote={addEditNote} delNote={removeNote}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}