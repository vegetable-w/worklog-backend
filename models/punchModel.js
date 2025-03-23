const pool = require("../db");

const addPunchRecord = async (
  employee_id,
  type,
  punch_time,
  punch_date,
  is_business_trip = false,
  image_url = null,
  memo = null,
  is_manual = false,
  approved = true,
  manual_reason = null
) => {
  try {
    const query = `
      INSERT INTO punch_records (employee_id, type, punch_time, punch_date, is_business_trip, image_url, memo, is_manual, approved, manual_reason)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      employee_id,
      type,
      punch_time,
      punch_date,
      is_business_trip,
      image_url,
      memo,
      is_manual,
      approved,
      manual_reason,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getPunchRecordsByEmployee = async (employee_id) => {
  try {
    const query = `
      SELECT pr.id, pr.type, pr.punch_time, pr.punch_date, pr.is_business_trip, pr.image_url, pr.memo, pr.is_manual, pr.approved, pr.manual_reason,
             u.name, u.employee_number, u.role
      FROM punch_records pr
      JOIN users u ON pr.employee_id = u.id
      WHERE pr.employee_id = $1
      ORDER BY pr.punch_time DESC;
    `;
    const result = await pool.query(query, [employee_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const deletePunchRecord = async (employee_id, record_id) => {
  try {
    const query = `
        DELETE FROM punch_records
        WHERE id = $1 AND employee_id = $2
        RETURNING *;
      `;
    const result = await pool.query(query, [record_id, employee_id]);

    return result.rowCount > 0;
  } catch (error) {
    throw error;
  }
};

const approveManualPunchRecord = async (record_id) => {
  try {
    const query = `
        UPDATE punch_records
        SET approved = true
        WHERE id = $1 AND is_manual = true
        RETURNING *;
      `;
    const result = await pool.query(query, [record_id]);

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllPunchRecords = async () => {
  try {
    const query = `
      SELECT pr.*, u.name, u.employee_number, u.role
      FROM punch_records pr
      JOIN users u ON pr.employee_id = u.id
      ORDER BY pr.punch_time DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addPunchRecord,
  getPunchRecordsByEmployee,
  getAllPunchRecords,
  deletePunchRecord,
  approveManualPunchRecord,
};
