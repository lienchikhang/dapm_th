let User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto-js");

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
  const { username, password, gender, phone, birth } = req.body;
  console.log({ username, password, gender, phone, birth });
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
      gender,
      phone,
      birtday: birth,
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

const changeInfor = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const { password, birtday, gender, phone } = req.body;
    const hashedPassword = crypto.AES.encrypt(
      password,
      process.env.PASS_CRYPTO
    ).toString();
    const result = await User.findOneAndUpdate(
      { _id: idUser },
      {
        password: hashedPassword,
        birtday: birtday,
        gender: gender,
        phone: phone,
      },
      { new: true }
    );
    res.status(200).json({ message: "update Success", result: result });
  } catch (err) {
    console.log(err);
  }
};

const takeInfoUserById = async (req, res) => {
  try {
    const idUser = req.params.idUser;
    const infoUser = await User.findOne({ _id: idUser });
    infoUser.password = crypto.AES.decrypt(infoUser.password, process.env.PASS_CRYPTO).toString(crypto.enc.Utf8);
    console.log(infoUser)
    res
      .status(200)
      .json({ message: "take infor user success", result: infoUser });
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, message: "get_all", data: users });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: err });
  }
};

const searchUser = async (req, res) => {
  try {
    const { name, phone } = req.body
    const querry = {}
    if (name) {
      querry.username = name
    }
    if (phone) {
      querry.phone = phone
    }
    const users = await User.find(querry)
    res.status(200).json({ users })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  register,
  login,
  resetPass,
  stats,
  checkLogin,
  changeInfor,
  takeInfoUserById,
  getAll,
  searchUser
};
