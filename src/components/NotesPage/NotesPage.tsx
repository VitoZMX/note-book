import React, {useState} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export function NotesPage() {
    const [notes, setNotes] = useState()
    const [newNoteContent, setNewNoteContent] = useState('')
    const [newNoteTags, setNewNoteTags] = useState<string[]>([])
    const [editedNote, setEditedNote] = useState()
    const [selectedTags, setSelectedTags] = useState<string[]>([])

    return (
        <Box p={2}>
            <Typography variant="h4" gutterBottom>
                Добро пожаловать в наш сервис заметок!
            </Typography>

            <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                    Создание, редактирование, удаление заметок
                </Typography>

                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item>
                        <TextField
                            label="Новая заметка"
                            value={newNoteContent}
                            onChange={() => {
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => {
                        }}>
                            Создать
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                    Фильтрация заметок по тегу
                </Typography>

                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item>
                        <Box display="flex" flexWrap="wrap">

                        </Box>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={() => {
                        }}>
                            Очистить фильтр
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box mb={2}>
                <Typography variant="h6" gutterBottom>
                    Список заметок
                </Typography>

                <Grid container spacing={2} direction="column">

                </Grid>
            </Box>
        </Box>
    )
}