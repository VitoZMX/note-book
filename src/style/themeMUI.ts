import {createTheme} from '@mui/material/styles'

export const LightTheme = createTheme({
    palette: {
        primary: {
            main: '#248ab8',
        },
        secondary: {
            main: '#8884d8'
        },
        background: {
            default: '#e0e5ea',
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#01314b',
                },
            },
        },
    },
})

export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#248ab8',
        },
        secondary: {
            main: '#8884d8'
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
                    backgroundColor: '#01314b',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242',
                },
            },
        },
    },
})