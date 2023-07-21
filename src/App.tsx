import React, {useState} from 'react'
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import {Navbar} from './components/NavBar/Navbar'
import {Preloader} from './components/common/Preloader'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {HomePage} from './components/HomePage/HomePage'
import Container from '@mui/material/Container'
import {NotesPage} from './components/NotesPage/NotesPage'

const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#248ab8',
        },
        background: {
            default: '#e0e5ea',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#01314b', // замените на ваш желаемый цвет фона AppBar
                },
            },
        },
    },
})

const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#248ab8',
        },
        text: {
            primary: '#eff0ee',
        },
        background: {
            default: '#2B2B2B',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#01314b', // замените на ваш желаемый цвет фона AppBar
                },
            },
        },
    },
})

export function App() {
    const [loading, setLoading] = useState(false)
    const [currentTheme, setCurrentTheme] = useState(LightTheme)

    const handleThemeChange = () => {
        setCurrentTheme(currentTheme === LightTheme ? DarkTheme : LightTheme)
    }

    return (
        <>
            {loading ?
                (
                    <Preloader/>
                )
                :
                (
                    <HashRouter>
                        <ThemeProvider theme={currentTheme}>
                            <CssBaseline/>
                            <div>
                                <Navbar ThemeActive={handleThemeChange}/>
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
                )}
        </>
    )
}