import React, {useCallback, useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'
import {useTheme} from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, {SelectChangeEvent} from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import {removeDuplicatesTags} from '../../../utils/utils'
import {Dispatch} from 'redux'
import {useDispatch} from 'react-redux'
import Tooltip from '@mui/material/Tooltip'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuPropsStyle = {
    PaperProps: {
        style: {
            anchorOrigin: {vertical: 'bottom', horizontal: 'left'},
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 260,
        },
    },
}

type FilterTagsPropsType = {
    tags: string[]
    addTagFilter: (tags: string[]) => void
}

export function FilterTags({tags, addTagFilter}: FilterTagsPropsType) {
    const [tagNote, setTagNote] = useState<string[]>([])
    const theme = useTheme()
    const labelSelect = 'Теги фильтра'
    const dispatch: Dispatch<any> = useDispatch()

    const addTag = useCallback(
        (tags: string[]) => dispatch(addTagFilter(tags)),
        [dispatch, addTagFilter]
    )

    useEffect(() => {
        addTag(tagNote)
    }, [addTag, tagNote])

    useEffect(() => {
        const removedTags = tagNote.filter(tag => !tags.includes(tag))
        if (removedTags.length > 0) {
            setTagNote(tagNote.filter(tag => !removedTags.includes(tag)))
        }
    }, [tags, tagNote])

    const handleChangeFilter = (event: SelectChangeEvent<typeof tagNote>) => {
        const {
            target: {value},
        } = event
        setTagNote(
            typeof value === 'string' ? value.split(',') : value,
        )

    }

    const handleClickClearFilter = () => {
        setTagNote([])
    }

    return (
        <Grid container spacing={2}>
            <Grid item>
                <FormControl sx={{minWidth: 223}}>
                    <InputLabel size="small" id="multipleChipLabel">{labelSelect}</InputLabel>
                    <Select
                        labelId="multipleChipLabel"
                        id="multipleChip"
                        multiple
                        value={tagNote}
                        size="small"
                        onChange={handleChangeFilter}
                        input={<OutlinedInput id="selectMultipleChip" label={labelSelect}/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Tooltip key={value} title={value}>
                                        <Chip sx={{
                                            backgroundColor: theme.palette.secondary.main,
                                            color: '#e7e7e7',
                                            maxWidth: 120
                                        }}
                                              label={value}/>
                                    </Tooltip>
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuPropsStyle}>

                        {removeDuplicatesTags(tags).map((tag) => (
                            <MenuItem
                                key={tag}
                                value={tag}
                            >
                                {tag}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
            </Grid>

            <Grid item>
                <Button style={{height: '100%'}} variant="outlined" aria-label="clearFilter"
                        onClick={handleClickClearFilter} color="primary" startIcon={<HighlightOffIcon/>}>
                    Очистить фильтр
                </Button>
            </Grid>
        </Grid>
    )
}