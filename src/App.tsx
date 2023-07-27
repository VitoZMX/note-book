import React, {useEffect, useState} from 'react'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {Navbar} from './components/NavBar/Navbar'
import {Preloader} from './components/common/Preloader'
import {ThemeProvider} from '@mui/material/styles'
import {DarkTheme, LightTheme} from './style/themeMUI'
import {HomePage} from './components/HomePage/HomePage'
import Container from '@mui/material/Container'
import {NotesPage} from './components/NotesPage/NotesPage'
import {useDispatch, useSelector} from 'react-redux'
import {AppStateType} from './store/store'
import {Dispatch} from 'redux'
import {initializeApp, replaceTheme} from './store/app-reducer'

export function App() {
    const [currentTheme, setCurrentTheme] = useState(LightTheme)
    const dispatch: Dispatch<any> = useDispatch()
    const theme = useSelector((state: AppStateType) => state.app.theme)
    const initialized = useSelector((state: AppStateType) => state.app.initialized)

    useEffect(() => {
        switch (theme) {
            case 'light':
                setCurrentTheme(LightTheme)
                break
            case 'dark':
                setCurrentTheme(DarkTheme)
                break
            default:
                setCurrentTheme(LightTheme)
                break
        }
    }, [theme])

    useEffect(() => {
        dispatch(initializeApp())
    }, [dispatch])

    if (initialized) return <Preloader/>

    return (
        <HashRouter>
            <ThemeProvider theme={currentTheme}>
                <CssBaseline/>
                <div>
                    <Navbar replaceTheme={replaceTheme}/>
                    <Container>
                        <Routes>
                            <Route path="/home" element={<HomePage/>}/>
                            <Route path="/notes" element={<NotesPage/>}/>
                            <Route path="/*" element={<Navigate to={'/home'}/>}/>
                        </Routes>
                    </Container>
                </div>
            </ThemeProvider>
        </HashRouter>
    )
}