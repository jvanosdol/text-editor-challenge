import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database


// **********
// found code in week 19, day 3, activity 23, brought in the get and put methods and tweaked code to better fit the project's context
// **********

export const putDb = async (content) => {
  const textDb = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.add({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}



// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const textDb = await openDB('jate', 1);

   // Create a new transaction and specify the database and data privileges.
  const tx = textDb.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

   // Use the .get() method to get a piece of data from the database based on the id.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result.value);
  return result.value;
}

  





initdb();
