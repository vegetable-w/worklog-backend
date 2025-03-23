const express = require("express");
const router = express.Router();
const {
  createPunchRule,
  updateEmployeePunchRule,
  getRule,
} = require("../controllers/punchRuleController");

router.post("/", createPunchRule);

router.get("/", getRule);

router.patch("/:id", updateEmployeePunchRule);

module.exports = router;
