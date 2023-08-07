import React, {FC} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import s from './TextNoteItem.module.sass'
import {useTheme} from '@mui/material/styles'

type TextNoteItemPropsType = {
    text: string
    tags: string[]
}

export const TextNoteItem: FC<TextNoteItemPropsType> = ({text, tags}) => {
    const theme = useTheme()

    return (
        <Box className={s.textNote}>
            <Typography variant="body1">{text}
                {tags.length !== 0 && (
                    tags.map((tag) => (
                        <Box component="span" key={`${text}_${tag}`}
                             sx={{backgroundColor: theme.palette.secondary.main}}
                             className={s.tagNote}>{tag}</Box>
                    ))
                )}</Typography>
        </Box>
    )
}