const {
  addPunchRecord,
  getPunchRecordsByEmployee,
  getAllPunchRecords,
  deletePunchRecord,
  approveManualPunchRecord,
} = require("../models/punchModel");

const createPunchRecord = async (req, res) => {
  try {
    const {
      id,
      type,
      punch_time,
      punch_date,
      is_business_trip,
      image_url,
      memo,
      is_manual,
      approved,
      manual_reason,
    } = req.body;
    if (!id || !type || !punch_time || !punch_date) {
      return res
        .status(400)
        .json({ status: "fail", message: "必要なパラメータが不足している" });
    }
    const record = await addPunchRecord(
      id,
      type,
      punch_time,
      punch_date,
      is_business_trip,
      image_url,
      memo,
      is_manual,
      approved,
      manual_reason
    );
    res.json({ status: "success", data: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const getEmployeePunchRecords = async (req, res) => {
  try {
    const { employee_id } = req.params;
    const records = await getPunchRecordsByEmployee(employee_id);
    res.json({ status: "success", data: records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const getAllPunchRecordsController = async (req, res) => {
  try {
    const records = await getAllPunchRecords();
    res.json({ status: "success", data: records });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const deletePunchRecordController = async (req, res) => {
  const { employee_id, record_id } = req.params;
  try {
    const response = await deletePunchRecord(employee_id, record_id);
    if (response) {
      res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const approveManualPunchRecordController = async (req, res) => {
  const { record_id } = req.params;

  try {
    const updated = await approveManualPunchRecord(record_id);

    res.json({ status: "success", data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

module.exports = {
  createPunchRecord,
  getEmployeePunchRecords,
  getAllPunchRecordsController,
  deletePunchRecordController,
  approveManualPunchRecordController,
};
