// utils/db.js
import sqlite3 from 'sqlite3';

const connectToAuthDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./path_to_authentication_db.db', (err) => {
      if (err) {
        reject('Failed to connect to authentication database');
      } else {
        resolve(db);
      }
    });
  });
};

const connectToAppDb = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database('./path_to_application_tracking_db.db', (err) => {
      if (err) {
        reject('Failed to connect to application tracking database');
      } else {
        resolve(db);
      }
    });
  });
};

export { connectToAuthDb, connectToAppDb };
