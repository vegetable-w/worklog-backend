const { getAllUsers } = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: "サーバーエラー" });
  }
};
