import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

let saveTimer = null;

export function saveToFirestore(data, onStatus) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    try {
      if (onStatus) onStatus('saving');
      await setDoc(doc(db, 'appData', 'main'), data);
      if (onStatus) onStatus('saved');
    } catch (e) {
      console.warn('Firestore save failed:', e);
      if (onStatus) onStatus('error', e.message || 'Save failed');
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
