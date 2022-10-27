import { openDB } from 'idb';

const initdb = async () =>
// Creates a new database named 'jate' and uses version 1 of the databases
  openDB('jate', 1, {
    // Add the database schema if it hasn't been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Creates a new object store for the data named "id" which will increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Exports a function that updates database
export const putDb = async (content) => {
  console.log('Updating the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('contact');

  const request = store.add(content);

  const result = await request;

  console.log('🚀 - data saved to the database', result);

};

// GET from database
export const getDb = async () => {
  console.log('GET from database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;

  console.log('result.value', result);
  return result
};

// Starts database
initdb();
