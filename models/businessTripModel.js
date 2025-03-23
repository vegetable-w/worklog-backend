const pool = require("../db");

const addBusinessTrip = async (
  employee_id,
  name,
  destination,
  trip_start,
  trip_end,
  reason
) => {
  try {
    const query = `
      INSERT INTO business_trips (employee_id, name, destination, trip_start, trip_end, reason)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      employee_id,
      name,
      destination,
      trip_start,
      trip_end,
      reason,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllBusinessTrips = async () => {
  try {
    const query = `
      SELECT b.*, u.employee_number, u.name
      FROM business_trips b
      JOIN users u ON b.employee_id = u.id
      ORDER BY b.trip_start DESC;
      `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getBusinessTripsByEmployee = async (employee_id) => {
  try {
    const query =
      "SELECT * FROM business_trips WHERE employee_id = $1 ORDER BY trip_start DESC;";
    const result = await pool.query(query, [employee_id]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const updateBusinessTripStatus = async (id, approved) => {
  try {
    const query = `
      UPDATE business_trips 
      SET approved = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [approved, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBusinessTrip,
  getAllBusinessTrips,
  getBusinessTripsByEmployee,
  updateBusinessTripStatus,
};
