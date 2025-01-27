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
  
});

export async function query(text, params) {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw new Error('Query failed');
    }
}