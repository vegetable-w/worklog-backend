const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { createUser, getUserByEmail } = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const { name, email, employee_number, role, status, hire_date, password } =
      req.body;

    if (!name || !email || !employee_number || !hire_date || !password) {
      return res
        .status(400)
        .json({ status: "fail", message: "必要なパラメータが不足している" });
    }

    const newUser = await createUser({
      name,
      email,
      employee_number,
      role,
      status,
      hire_date,
      password,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "ユーザーの作成に失敗した" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: "fail",
        message: "メールアドレスとパスワードを入力してください",
      });
    }

    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({
        status: "fail",
        message: "メールアドレスまたはパスワードが間違っている",
      });
    }

    const token = signToken(user.id);

    res.status(200).json({
      status: "success",
      token,
      data: {
        id: user.id,
        name: user.name,
        employee_number: user.employee_number,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: "ログイン失敗した" });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ status: "fail", message: "未ログイン" });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await getUserByEmail(decoded.id);
    if (!currentUser) {
      return res
        .status(401)
        .json({ status: "fail", message: "ユーザーが存在しなかった" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({ status: "fail", message: "無効なトークン" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "ログアウトした",
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "この操作を実行する権限がない",
      });
    }
    next();
  };
};
