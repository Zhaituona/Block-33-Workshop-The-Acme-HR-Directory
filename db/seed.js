
const pool = require('./client');

const seedDatabase = async () => {
  try {
    // Create Departments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `);

    // Create Employees table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        department_id INTEGER REFERENCES departments(id)
      );
    `);

    // Seed departments
    await pool.query(`
      INSERT INTO departments (name) VALUES
      ('HR'), ('Engineering'), ('Marketing')
      ON CONFLICT DO NOTHING;
    `);

    // Seed employees
    await pool.query(`
      INSERT INTO employees (name, department_id) VALUES
      ('John Doe', 1), ('Jane Smith', 2)
      ON CONFLICT DO NOTHING;
    `);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
