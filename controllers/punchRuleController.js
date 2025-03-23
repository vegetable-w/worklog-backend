const {
  addPunchRule,
  getPunchRule,
  updatePunchRule,
} = require("../models/punchRuleModel");

const createPunchRule = async (req, res) => {
  try {
    const { work_start, work_end, total_break_duration } = req.body;
    if (!work_start || !work_end || !total_break_duration) {
      return res
        .status(400)
        .json({ status: "fail", message: "必要なパラメータが不足している" });
    }
    const rule = await addPunchRule(work_start, work_end, total_break_duration);
    res.json({ status: "success", data: rule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const getRule = async (req, res) => {
  try {
    const rules = await getPunchRule();
    res.json({ status: "success", data: rules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

const updateEmployeePunchRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { work_start, work_end, total_break_duration } = req.body;
    const updatedRule = await updatePunchRule(
      id,
      work_start,
      work_end,
      total_break_duration
    );
    res.json({ status: "success", data: updatedRule });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};

module.exports = {
  createPunchRule,
  getRule,
  updateEmployeePunchRule,
};
