import React, {FC, useCallback, useState} from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import NotesIcon from '@mui/icons-material/Notes'
import HomeIcon from '@mui/icons-material/Home'
import {ButtonBase, Icon} from '@material-ui/core'
import {NavLink} from 'react-router-dom'
import Switch from '@mui/material/Switch'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from '../../store/store'
import {themeType} from '../../types/types'
import {Dispatch} from 'redux'

const itemsNavMenu = [
    {text: 'Главная страница', link: '/home', icon: <HomeIcon/>},
    {text: 'Заметки', link: '/notes', icon: <NotesIcon/>},
]

type NavbarPropsType = {
    replaceTheme: (theme: themeType) => void
}

export const Navbar: FC<NavbarPropsType> = ({replaceTheme}) => {
    const themeState = useSelector((state: AppStateType) => state.app.theme)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
    const dispatch: Dispatch<any> = useDispatch()

    const setTheme = useCallback(
        (thm: themeType) => dispatch(replaceTheme(thm)),
        [dispatch, replaceTheme]
    )

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorElUser(null)
    }

    const handleChangeTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? 'dark' : 'light')
    }

    return (
        <Box sx={{flexGrow: 1, marginBottom: '15px'}}>
            <AppBar position="static" style={{height: '50px'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters variant={'dense'}>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            noteBook
                        </Typography>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Other pages">
                                <IconButton onClick={handleOpenMenu} sx={{p: 1}}>
                                    <Icon style={{color: '#ffffff'}}>
                                        <MoreVertIcon/>
                                    </Icon>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseMenu}
                            >
                                {itemsNavMenu.map(({text, link, icon}) => (
                                    <ButtonBase
                                        component={NavLink}
                                        to={link}
                                        style={{display: 'flex', alignItems: 'center'}}
                                        key={text}
                                    >
                                        <MenuItem style={{width: '100%'}}
                                                  onClick={handleCloseMenu}>
                                            {icon}
                                            <Typography sx={{ml: 2}}>{text}</Typography>
                                        </MenuItem>
                                    </ButtonBase>
                                ))}
                                <Typography>
                                    <Switch checked={themeState === 'dark'} key={'changeTheme'}
                                            onChange={handleChangeTheme}/>
                                    Тёмная тема
                                </Typography>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    )
}