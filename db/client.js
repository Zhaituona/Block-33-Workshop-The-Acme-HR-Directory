
const { Pool } = require('pg');

// Create a new connection pool to PostgreSQL
const pool = new Pool({
  user: 'your_postgres_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

module.exports = pool;
