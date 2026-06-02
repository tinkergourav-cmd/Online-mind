import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

let saveTimer = null;

export function saveToFirestore(data) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      await setDoc(doc(db, 'appData', 'main'), data);
    } catch (e) {
      console.warn('Firestore save failed:', e);
    }
  }, 2500);
}

export async function loadFromFirestore() {
  try {
    const snapshot = await getDoc(doc(db, 'appData', 'main'));
    if (snapshot.exists()) {
      return snapshot.data();
    }
    return null;
  } catch (e) {
    console.warn('Firestore load failed:', e);
    return null;
  }
}
