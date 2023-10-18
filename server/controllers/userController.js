let User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto-js");
require("dotenv").config();

//GET
const checkLogin = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ success: false, error: err });
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;

  //check null
  if (!username || !password)
    return res
      .status(401)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    //check exist
    const user = await User.findOne({ username });
    if (user)
      return res
        .status(401)
        .json({ success: false, message: "Username is already taken!" });

    const hashedPassword = crypto.AES.encrypt(
      password,
      process.env.PASS_CRYPTO
    );
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "Register successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const resetPass = async (req, res) => {
  const userNeed = req.params.id;
  try {
    // const enPass = crypto.AES.encrypt("resetPass123", process.env.PASS_CRYPTO);
    const updatedUser = await User.findByIdAndUpdate(
      userNeed,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const stats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ success: true, message: "Happing Stat", data });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });

  if (!username || !password)
    return res
      .status(401)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password! " });

    const unhasedPassword = crypto.AES.decrypt(
      user.password,
      process.env.PASS_CRYPTO
    ).toString(crypto.enc.Utf8);
    if (password !== unhasedPassword)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect username or password" });
    const accessToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_ACCESS_TOKEN
    );
    res.status(200).json({
      success: true,
      message: "Login successfully!",
      user: {
        ...user._doc,
        password: unhasedPassword,
        accessToken,
      },
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

module.exports = {
  register,
  login,
  resetPass,
  stats,
  checkLogin,
};
