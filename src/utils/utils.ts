import {INoteType} from '../types/types'
import {v1} from 'uuid'

export function parseNoteData(noteText: string, OldId?: string): INoteType {
    let id = OldId
    const parts = noteText.split('#').map(part => part.trim())

    const text = parts[0]
    const tags = parts.slice(1).map(tag => `#${tag}`)

    if (!id) {
        id = v1()
    }
    return {text, tags, id, date: {seconds: 0, nanoseconds: 0}}
}

export function filterNotesByTags(notes: INoteType[], tags: string[]): INoteType[] {
    if (tags.length === 0) return notes
    return notes.filter(note => note.tags.some(tag => tags.includes(tag)))
}

export function convertSecondsToDateTime(seconds: number): string {
    if (!seconds) return ''
    const milliseconds = seconds * 1000
    const date = new Date(milliseconds)

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }
    return date.toLocaleString('ru-RU', options)
}

export function removeDuplicatesTags(tags: string[]): string[] {
    return tags.filter((string, index) => {
        return string.trim().length > 0 && tags.indexOf(string) === index
    })
}