import {addDoc, collection, getDocs, query, updateDoc, where} from 'firebase/firestore'
import {themeType} from '../types/types'
import {dataBase} from './firebaseConfig'

const idTheme = 'themeID'
const DefaultTheme = 'light' as themeType
const pathCollectionTheme = 'theme'
const CollectionTheme = collection(dataBase, pathCollectionTheme)

export const themeAPI = {
    async getTheme() {
        const queryGT = query(CollectionTheme, where('id', '==', idTheme))
        const querySnapshot = await getDocs(queryGT)
        const docSnapshot = querySnapshot.docs[0]
        if (docSnapshot && docSnapshot.exists()) {
            const result = docSnapshot.data()
            return result.theme as themeType
        } else {
            await addDoc(CollectionTheme, {theme: DefaultTheme, id: idTheme})
            return DefaultTheme as themeType
        }
    },
     async setTheme(theme: string) {
        const queryST = query(CollectionTheme, where('id', '==', idTheme))
        const querySnapshot = await getDocs(queryST)
        const docSnapshot = querySnapshot.docs[0]
        if (docSnapshot) {
            return await updateDoc(docSnapshot.ref, {theme: theme})
        }
    }
}

