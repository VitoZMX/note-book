import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyCUvjAUSjxy_YmKmUJLtaDjMZs7lMd4WGo',
    authDomain: 'notebook-zmx.firebaseapp.com',
    projectId: 'notebook-zmx',
    storageBucket: 'notebook-zmx.appspot.com',
    messagingSenderId: '447449440575',
    appId: '1:447449440575:web:6151953e1a0ffac138738a'
}

export const dataBase = getFirestore(initializeApp(firebaseConfig))