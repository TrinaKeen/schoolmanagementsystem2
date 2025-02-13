import express from 'express';
import { query } from '../../Database/db.js'; // Correct path to db.js file

const app = express();
const port = 3000;

// Sample API endpoint to test the database connection
app.get('/test-connection', async (req, res) => {
  try {
    // Run a simple query to test the connection
    const result = await query('SELECT NOW()', []);
    res.json({
      message: 'Database is connected!',
      currentTime: result[0].now, // The result will contain the current time from the query
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to connect to the database',
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
