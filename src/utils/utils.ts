import {INoteType} from '../types/types'
import {v1} from 'uuid'

export function parseNoteData(noteText: string, OldId?: string): INoteType {
    let id = OldId
    const index = noteText.indexOf('#')
    const text = index === -1 ? noteText.trim() : noteText.substring(0, index).trim()
    const tag = index === -1 ? '' : noteText.substring(index).trim()
    if (!id) {
        id = v1()
    }
    return {text, tag, id}
}

export function filterNotesByTags(notes: INoteType[], tags: string[]): INoteType[] {
    if (tags.length === 0) return notes
    return notes.filter(note => tags.includes(note.tag))
}

export function removeDuplicatesTags(tags: string[]): string[] {
    return tags.filter((string, index) => {
        return string.trim().length > 0 && tags.indexOf(string) === index
    })
}