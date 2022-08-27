import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAgRchEi_ZJ2_qaaJw7pKuAI_8NCOZR3KY',
  authDomain: 'qoomei-todo.firebaseapp.com',
  projectId: 'qoomei-todo',
  storageBucket: 'qoomei-todo.appspot.com',
  messagingSenderId: '1013191501437',
  appId: '1:1013191501437:web:2d7931082a7ab713beb314',
  measurementId: 'G-QS7NG0C4CM',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
