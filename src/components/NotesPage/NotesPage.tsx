import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import {NoteItem} from './NoteItem/NoteItem'
import {FilterTags} from './FilterTags/FilterTags'
import {CreateNewNote} from './CreateNewNote/CreateNewNote'
import {INoteType} from '../../types/types'
import {FC, useEffect} from 'react'
import {filterNotesByTags} from '../../utils/utils'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {addEditNote, addNote, addSelectTagFilter, addTagFilter, removeNote} from '../../store/notes-reducer'
import {Dispatch} from 'redux'

type NotesPagePropsType = {}

export const NotesPage: FC<NotesPagePropsType> = () => {
    const dispatch: Dispatch<any> = useDispatch()

    const AllTags: string[] = useSelector(
        (state: AppStateType) => state.notes.tagsFilter,
        shallowEqual
    )

    const SelectedTags: string[] = useSelector(
        (state: AppStateType) => state.notes.selectedTagFilter,
        shallowEqual
    )

    const notes: INoteType[] = useSelector(
        (state: AppStateType) => state.notes.notes,
        shallowEqual
    )

    useEffect(() => {
        dispatch(addTagFilter())
    }, [dispatch, notes])

    const VisibleNotes = filterNotesByTags(notes, SelectedTags)

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
                    <FilterTags addTagFilter={addSelectTagFilter} SelectedTags={SelectedTags} tags={AllTags}/>
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