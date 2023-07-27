import React, {FC} from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import s from './TextNoteItem.module.sass'
import {useTheme} from '@mui/material/styles'

type TextNoteItemPropsType = {
    text: string
    tag: string
}

export const TextNoteItem: FC<TextNoteItemPropsType> = ({text, tag}) => {
    const theme = useTheme()

    return (
        <Box className={s.textNote}>
            <Typography variant="body1">{text}
                {tag.length !== 0 && (
                    <Box component="span" sx={{backgroundColor: theme.palette.secondary.main}}
                         className={s.tagNote}>{tag}</Box>
                )}</Typography>
        </Box>
    )
}