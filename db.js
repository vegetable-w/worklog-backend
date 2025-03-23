const { Pool } = require("pg");

require("dotenv").config();

const DB = process.env.DATABASE_URL.replace(
  "[YOUR-PASSWORD]",
  process.env.DATABASE_PASSWORD
);

const pool = new Pool({
  connectionString: DB,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

module.exports = pool;
