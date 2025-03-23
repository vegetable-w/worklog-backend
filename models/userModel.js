const bcrypt = require("bcryptjs");
const pool = require("../db");

const createUser = async ({
  name,
  email,
  employee_number,
  role,
  status,
  hire_date,
  password,
}) => {
  try {
    const password_hash = await bcrypt.hash(password, 12);
    const insertQuery = `
      INSERT INTO users (name, email, employee_number, role, status, hire_date, password_hash)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, email, role, status, hire_date, created_at;
    `;
    const values = [
      name,
      email,
      employee_number,
      role,
      status,
      hire_date,
      password_hash,
    ];
    const res = await pool.query(insertQuery, values);
    return res.rows[0];
  } catch (error) {
    console.error("❌ Error inserting user:", error);
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, status, hire_date, created_at FROM users"
    );
    return result.rows;
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    throw error;
  }
};

module.exports = { createUser, getUserByEmail, getAllUsers };
