const express = require("express");
const router = express.Router();
const {
  createBusinessTrip,
  getAllBusinessTripsController,
  getEmployeeBusinessTrips,
  approveOrRejectBusinessTrip,
} = require("../controllers/businessTripController");

router.post("/", createBusinessTrip);

router.get("/", getAllBusinessTripsController);

router.get("/:employee_id", getEmployeeBusinessTrips);

router.patch("/:id", approveOrRejectBusinessTrip);

module.exports = router;
