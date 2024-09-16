
const express = require('express');
const router = express.Router();
const pool = require('./client');

// GET /api/employees: Returns an array of employees
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/employees: Create a new employee
router.post('/', async (req, res) => {
  const { name, department_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO employees (name, department_id, created_at, updated_at) VALUES ($1, $2, NOW(), NOW()) RETURNING *',
      [name, department_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/employees/:id: Deletes an employee
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM employees WHERE id = $1', [id]);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/employees/:id: Updates an employee
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, department_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE employees SET name = $1, department_id = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [name, department_id, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
