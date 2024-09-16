
const express = require('express');
const router = express.Router();
const pool = require('./client');

// GET /api/departments: Returns an array of departments
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departments');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
