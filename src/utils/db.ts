import { SgkImageItem, ScenarioItem } from '../types/gdtc';

const DB_NAME = 'gdtc_smartplan_db';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('scenarios')) {
        db.createObjectStore('scenarios', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('app_state')) {
        db.createObjectStore('app_state', { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllImagesDB(): Promise<SgkImageItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('images', 'readonly');
      const store = tx.objectStore('images');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (e) {
    console.warn('IDB getAllImagesDB error', e);
    return [];
  }
}

export async function saveImagesDB(images: SgkImageItem[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');
    store.clear();
    images.forEach((img) => store.put(img));
  } catch (e) {
    console.warn('IDB saveImagesDB error', e);
  }
}

export async function clearImagesDB(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('images', 'readwrite');
    tx.objectStore('images').clear();
  } catch (e) {
    console.warn('IDB clearImagesDB error', e);
  }
}

export async function getAllScenariosDB(): Promise<ScenarioItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('scenarios', 'readonly');
      const store = tx.objectStore('scenarios');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (e) {
    console.warn('IDB getAllScenariosDB error', e);
    return [];
  }
}

export async function saveScenariosDB(scenarios: ScenarioItem[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('scenarios', 'readwrite');
    const store = tx.objectStore('scenarios');
    store.clear();
    scenarios.forEach((s) => store.put(s));
  } catch (e) {
    console.warn('IDB saveScenariosDB error', e);
  }
}

export async function getAppStateDB<T>(key: string, defaultValue: T): Promise<T> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction('app_state', 'readonly');
      const store = tx.objectStore('app_state');
      const req = store.get(key);
      req.onsuccess = () => {
        if (req.result && req.result.value !== undefined) {
          resolve(req.result.value);
        } else {
          resolve(defaultValue);
        }
      };
      req.onerror = () => resolve(defaultValue);
    });
  } catch (e) {
    console.warn('IDB getAppStateDB error', e);
    return defaultValue;
  }
}

export async function setAppStateDB<T>(key: string, value: T): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('app_state', 'readwrite');
    const store = tx.objectStore('app_state');
    store.put({ key, value });
  } catch (e) {
    console.warn('IDB setAppStateDB error', e);
  }
}
