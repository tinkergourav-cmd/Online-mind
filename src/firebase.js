import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCriJtwVVrFG12nnG8FQml2ugRIFbsDmLU",
  authDomain: "online-mind-90ec4.firebaseapp.com",
  projectId: "online-mind-90ec4",
  storageBucket: "online-mind-90ec4.firebasestorage.app",
  messagingSenderId: "230473810317",
  appId: "1:230473810317:web:180c7d14b000a9cb6e3dc4",
  measurementId: "G-FC9WTYK7E7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
