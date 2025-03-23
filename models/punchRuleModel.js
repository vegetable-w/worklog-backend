const pool = require("../db");

const addPunchRule = async (work_start, work_end, total_break_duration) => {
  try {
    const query = `
      INSERT INTO punch_rules (work_start, work_end, total_break_duration)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [work_start, work_end, total_break_duration];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updatePunchRule = async (
  id,
  work_start,
  work_end,
  total_break_duration
) => {
  try {
    const query = `
      UPDATE punch_rules
      SET work_start = $1,
          work_end = $2,
          total_break_duration = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [work_start, work_end, total_break_duration, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getPunchRule = async () => {
  try {
    const query = "SELECT * FROM punch_rules;";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPunchRule,
  updatePunchRule,
  getPunchRule,
};
