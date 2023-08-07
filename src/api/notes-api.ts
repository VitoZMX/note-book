import {
    addDoc,
    collection,
    deleteDoc,
    getDoc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore'
import {INoteType, NoteDateType} from '../types/types'
import {dataBase} from './firebaseConfig'

const pathCollectionNotes = 'notes'
const CollectionNotes = collection(dataBase, pathCollectionNotes)

export const notesAPI = {
    async getAllNotes() {
        const querySnapshot = await getDocs(query(CollectionNotes, orderBy('date', 'desc')))
        return querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        })) as INoteType[]
    },
    async setNote(note: INoteType) {
        const noteWithDate = {
            ...note,
            date: serverTimestamp(),
        }
        const docRef = await addDoc(CollectionNotes, noteWithDate)
        const docSnapshot = await getDoc(docRef)
        const {date} = docSnapshot.data() as { date: NoteDateType }
        return date
    },
    async setEditedNote(note: INoteType) {
        const querySEN = query(CollectionNotes, where('id', '==', note.id))
        const querySnapshot = await getDocs(querySEN)
        const docSnapshot = querySnapshot.docs[0]
        if (docSnapshot) {
            return await updateDoc(docSnapshot.ref, {tags: note.tags, text: note.text})
        }
    },
    async delNote(noteID: string) {
        const queryDN = query(CollectionNotes, where('id', '==', noteID))
        const querySnapshot = await getDocs(queryDN)

        if (querySnapshot.docs.length > 0) {
            const foundDoc = querySnapshot.docs[0]
            return await deleteDoc(foundDoc.ref)
        } else {
            console.log(`Документ с id ${noteID} не найден`)
        }
    },
}