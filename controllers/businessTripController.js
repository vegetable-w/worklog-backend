const {
  addBusinessTrip,
  getAllBusinessTrips,
  getBusinessTripsByEmployee,
  updateBusinessTripStatus,
} = require("../models/businessTripModel");

const createBusinessTrip = async (req, res) => {
  try {
    const { id, name, destination, trip_start, trip_end, reason } = req.body;
    if (!id || !name || !destination || !trip_start || !trip_end || !reason) {
      return res
        .status(400)
        .json({ status: "fail", message: "必要なパラメータが不足している" });
    }

    const newTrip = await addBusinessTrip(
      id,
      name,
      destination,
      trip_start,
      trip_end,
      reason
    );
    res.json({ status: "success", data: newTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const getAllBusinessTripsController = async (req, res) => {
  try {
    const trips = await getAllBusinessTrips();
    res.json({ status: "success", data: trips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const getEmployeeBusinessTrips = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const trips = await getBusinessTripsByEmployee(employee_id);
    res.json({ status: "success", data: trips });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const approveOrRejectBusinessTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body;

    const updatedTrip = await updateBusinessTripStatus(id, approved);
    res.json({ status: "success", data: updatedTrip });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

module.exports = {
  createBusinessTrip,
  getAllBusinessTripsController,
  getEmployeeBusinessTrips,
  approveOrRejectBusinessTrip,
};
