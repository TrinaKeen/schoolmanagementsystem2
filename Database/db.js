import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Hardcoded values for the database connection
const pool = new Pool({
  user: 'postgres', // Replace with your actual database username
  host: '127.0.0.1', // Database host
  database: 'postgres', // Database name
  password: 'Password_25', // Replace with your actual database password
  port: 5432, // Database port (default PostgreSQL port)
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if no connection
});

// Function to query the database
export async function query(text, params) {
  try {
    console.log('Running query:', text);  // Log query
    console.log('With params:', params);  // Log parameters
    const res = await pool.query(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err; // Re-throw the error to be handled elsewhere
  }
}