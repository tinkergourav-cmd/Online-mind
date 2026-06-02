import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

let saveTimer = null;

/**
 * Save data to Firestore with status callback support.
 * @param {object} data - The data to save
 * @param {function} onStatusChange - Optional callback: (status) => void, status is 'saving' | 'saved' | 'error'
 */
export function saveToFirestore(data, onStatusChange) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(async () => {
    if (onStatusChange) onStatusChange('saving');
    try {
      const dataWithTimestamp = {
        ...data,
        lastSavedTimestamp: Date.now()
      };
      await setDoc(doc(db, 'appData', 'main'), dataWithTimestamp);
      if (onStatusChange) onStatusChange('saved');
    } catch (e) {
      console.warn('Firestore save failed:', e);
      if (onStatusChange) onStatusChange('error');
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
