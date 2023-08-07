export type  INoteType = {
    id: string
    text: string
    tags: string[]
    date: NoteDateType
}

export type NoteDateType = {
    nanoseconds: number
    seconds: number
}

export type themeType = 'light' | 'dark'