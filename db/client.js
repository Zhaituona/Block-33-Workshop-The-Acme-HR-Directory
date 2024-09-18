
const { Pool } = require('pg');

// Create a new connection pool to PostgreSQL
const pool = new Pool({
  host: 'localhost',
  user: 'postgres', // PostgreSQL username, e.g., 'postgres'
 password: 'Zana195726@', // PostgreSQL password
  database: 'postgres', // Name of the database 
  port: 5432, // PostgreSQL default port
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = pool;
