
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./employee');
const departmentRoutes = require('./department');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);

// Error handling route
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
