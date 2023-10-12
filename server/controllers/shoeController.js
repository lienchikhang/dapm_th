const Shoe = require("../models/Shoe.js");

//GET
const getShoe = async (req, res) => {
  const idShoe = req.params.id;
  try {
    const shoe = await Shoe.findById(idShoe);
    shoe
      ? res.status(200).json(shoe)
      : res.status(500).json("san pham khong co");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  let qShoe = req.query.type;
  let qColor = req.query.color;
  let qPrice = req.query.price;
  let qNew = req.query.new;
  let query = {};
  console.log({ qShoe, qColor, qPrice });
  try {
    if (qShoe && qColor && qPrice) {
      query = {
        $and: [
          { type: qShoe }, // Kiểm tra type
          { color: qColor }, // Kiểm tra color
          { price: { $gte: Number(qPrice) } }, // Kiểm tra color
        ],
      };
    } else if (qShoe && qColor) {
      query = {
        $and: [
          { type: qShoe }, // Kiểm tra type
          { color: qColor }, // Kiểm tra color
        ],
      };
    } else if (qColor && qPrice) {
      query = {
        $and: [
          { color: qColor }, // Kiểm tra color
          { price: { $gte: Number(qPrice) } }, // Kiểm tra color
        ],
      };
    } else if (qShoe && qPrice) {
      query = {
        $and: [
          { type: qShoe }, // Kiểm tra color
          { price: { $gte: Number(qPrice) } }, // Kiểm tra color
        ],
      };
    } else if (qShoe) {
      query = { type: qShoe };
    } else if (qColor) {
      query = { color: qColor };
    } else if (qPrice) {
      query = { price: { $gte: Number(qPrice) } };
    } else {
      query = {};
    }

    let filterShoes = await Shoe.find(query);
    if (qNew) {
      filterShoes = await Shoe.find().sort({ createdAt: -1 }).limit(5);
    }
    if (!filterShoes)
      return res.status(500).json({ success: false, message: "cannot query" });
    res.status(200).json(filterShoes);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

//POST
const createShoe = async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin)
    return res
      .status(401)
      .json({ success: false, message: "you are not authorized" });
  const newShoe = new Shoe({
    size: req.body.size,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    desc: req.body.desc,
    color: req.body.color,
    type: req.body.type,
  });
  try {
    await newShoe.save();
    res.status(200).json(newShoe);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteShoe = async (req, res) => {
  const idDeleted = req.params.id;
  try {
    const deleteShoe = await Shoe.findByIdAndDelete({ _id: idDeleted });
    if (!deleteShoe)
      return res
        .status(401)
        .json({ success: false, message: "Shoe not found" });
    res.status(200).json({
      success: true,
      message: "Delete successfully!",
      shoe: deleteShoe,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", error: err });
  }
};

//PUT
const updateShoe = async (req, res) => {
  const idShoe = req.params.id;
  const newShoe = req.body;
  console.log("idShoe", idShoe);
  try {
    const result = await Shoe.findByIdAndUpdate(idShoe, newShoe, { new: true });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAll,
  getShoe,
  createShoe,
  deleteShoe,
  updateShoe,
};
