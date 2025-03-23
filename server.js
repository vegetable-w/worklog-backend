const express = require("express");
const pool = require("./db");
const cors = require("cors");
const compression = require("compression");
const userRouter = require("./routes/userRoutes");
const punchRouter = require("./routes/punchRoutes");
const businessTripRouter = require("./routes/businessTripRoutes");
const punchRuleRouter = require("./routes/punchRuleRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(compression());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/punch", punchRouter);
app.use("/api/v1/business-trip", businessTripRouter);
app.use("/api/v1/punch-rule", punchRuleRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log("Server is running on http://localhost:3000");
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("💥database connected error:", err);
  }
});
