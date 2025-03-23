const express = require("express");
const router = express.Router();
const {
  createPunchRecord,
  getEmployeePunchRecords,
  getAllPunchRecordsController,
  deletePunchRecordController,
  approveManualPunchRecordController,
} = require("../controllers/punchController");

router.post("/", createPunchRecord);

router.get("/:employee_id", getEmployeePunchRecords);

router.get("/", getAllPunchRecordsController);

router.delete("/:employee_id/:record_id", deletePunchRecordController);

router.patch("/:record_id/approve", approveManualPunchRecordController);

module.exports = router;
