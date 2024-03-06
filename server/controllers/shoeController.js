const Cart = require("../models/Cart.js");
const Shoe = require("../models/Shoe.js");
const { shoeBuilder } = require("../Pattern/BuilderPattern/BuilderPattern.js")
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
  const filter = req.query.filter;
  console.log("filer", filter);
  const qNew = req.query.new;
  let query = {};
  if (filter) {
    const filterObject = JSON.parse(filter);
    console.log("fileterObjec", filterObject);
    if (filterObject?.type) {
      query.type = filterObject.type;
    }
    if (filterObject?.color) {
      query.color = filterObject.color;
    }
    if (filterObject?.price) {
      query.price = { $lte: filterObject.price };
    }
    if (filterObject?.size) {
      query.size = {
        $elemMatch: { ss: { $in: filterObject.size }, cs: { $gt: 0 } },
      };
    }
  }
  try {
    let filterShoes = await Shoe.find(query);
    if (qNew) {
      filterShoes = await Shoe.find().sort({ createdAt: -1 }).limit(5);
    }
    if (!filterShoes)
      return res.status(500).json({ success: false, message: "cannot query" });
    res.status(200).json(filterShoes);
  } catch (err) {
    console.log(err);
  }
};

//POST
const createShoe = async (req, res) => {
  try {
    const shoe = req.body;
    const checkNameShoe = await Shoe.findOne({ name: shoe.name });
    if (checkNameShoe) {
      return res.status(400).json({ message: 2 });
    }
    const newShoe = new shoeBuilder()
      .setSize(shoe.size)
      .setName(shoe.name)
      .setPrice(shoe.price)
      .setImg(shoe.img)
      .setDesc(shoe.desc)
      .setColor(shoe.color)
      .setType(shoe.type)
      .builder()
    const shoeSave = new Shoe({
      ...newShoe
    })
    await shoeSave.save();
    return res.status(200).json({ message: 1 });
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
const deleteShoe = async (req, res) => {
  const idDeleted = req.params.id;
  try {
    const deleteShoe = await Shoe.findByIdAndDelete({ _id: idDeleted });
    if (!deleteShoe) {
      return res
        .status(401)
        .json({ success: false, message: "Shoe not found" });
    }
    DeleteShoeUpdateInCart(idDeleted);
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
  try {
    const idShoe = req.params.id;
    const shoeDataUpdate = req.body;
    const currentShoe = await Shoe.findById(idShoe);
    if (currentShoe.name != shoeDataUpdate.name) {
      const shoeNameIsExist = await Shoe.findOne({ name: shoeDataUpdate.name });
      if (shoeNameIsExist) {
        return res.status(400).json();
      }
    }
    const result = await Shoe.findByIdAndUpdate(idShoe, shoeDataUpdate, {
      new: true,
    });
    if (result) {
      DeleteShoeUpdateInCart(idShoe);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const SearchShoe = async (req, res) => {
  try {
    const { name, type } = req.body;

    const query = {};
    if (name) {
      query.name = name;
    }
    if (type) {
      query.type = type;
    }
    const shoes = await Shoe.find(query);
    res.status(200).json(shoes);
  } catch (err) {
    console.log(err);
  }
};

const DeleteShoeUpdateInCart = async (idShoe) => {
  const AllcartHaveidShoe = await Cart.updateMany(
    { "shoes._id": idShoe },
    { $pull: { shoes: { _id: idShoe } } },
    { new: true }
  );
};

module.exports = {
  getAll,
  getShoe,
  createShoe,
  deleteShoe,
  updateShoe,
  SearchShoe,
};
