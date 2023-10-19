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
  const filter = req.query.filter;
  console.log("filer", filter);
  const qNew = req.query.new;
  let query = {};
  if (filter) {
    const filterObject = JSON.parse(filter);
    console.log("fileterObjec", filterObject);
    if (
      filterObject.type &&
      filterObject.color &&
      filterObject.price &&
      filterObject.size
    ) {
      query = {
        $and: [
          { type: filterObject.type },
          { color: filterObject.color },
          { price: { $gte: filterObject.price } },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type && filterObject.color && filterObject.price) {
      query = {
        $and: [
          { type: filterObject.type },
          { color: filterObject.color },
          { price: { $gte: filterObject.price } },
        ],
      };
    } else if (filterObject.type && filterObject.color && filterObject.size) {
      query = {
        $and: [
          { type: filterObject.type },
          { color: filterObject.color },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.price && filterObject.color && filterObject.size) {
      query = {
        $and: [
          { price: { $gte: filterObject.price } },
          { color: filterObject.color },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type && filterObject.price && filterObject.size) {
      query = {
        $and: [
          { type: filterObject.type },
          { price: { $gte: filterObject.price } },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type && filterObject.color) {
      query = {
        $and: [{ type: filterObject.type }, { color: filterObject.color }],
      };
    } else if (filterObject.color && filterObject.price) {
      query = {
        $and: [
          { color: filterObject.color },
          { price: { $gte: filterObject.price } },
        ],
      };
    } else if (filterObject.price && filterObject.size) {
      query = {
        $and: [
          { price: { $gte: filterObject.price } },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type && filterObject.size) {
      query = {
        $and: [
          { type: { $gte: filterObject.type } },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type && filterObject.price) {
      query = {
        $and: [
          { type: { $gte: filterObject.type } },
          { price: { $gte: filterObject.price } },
        ],
      };
    } else if (filterObject.color && filterObject.size) {
      query = {
        $and: [
          { color: { $gte: filterObject.color } },
          {
            size: {
              $elemMatch: { ss: { $in: filterObject.size } },
            },
          },
        ],
      };
    } else if (filterObject.type) {
      query = {
        type: filterObject.type,
      };
    } else if (filterObject.color) {
      query = {
        color: filterObject.color,
      };
    } else if (filterObject.price) {
      query = {
        price: { $gte: filterObject.price },
      };
    } else if (filterObject.size) {
      query = {
        size: {
          $elemMatch: { ss: { $in: filterObject.size } },
        },
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

  // let qShoe = req.query.type;
  // let qColor = req.query.color;
  // let qPrice = req.query.price;
  // let qNew = req.query.new;
  // let qSize = req.query.size;
  // let query = {};
  // console.log({ qShoe, qColor, qPrice, qSize });
  // try {
  //   if (qShoe && qColor && qPrice) {
  //     query = {
  //       $and: [
  //         { type: qShoe }, // Kiểm tra type
  //         { color: qColor }, // Kiểm tra color
  //         { price: { $gte: Number(qPrice) } }, // Kiểm tra color
  //       ],
  //     };
  //   } else if (qShoe && qColor) {
  //     query = {
  //       $and: [
  //         { type: qShoe }, // Kiểm tra type
  //         { color: qColor }, // Kiểm tra color
  //       ],
  //     };
  //   } else if (qColor && qPrice) {
  //     query = {
  //       $and: [
  //         { color: qColor }, // Kiểm tra color
  //         { price: { $gte: Number(qPrice) } }, // Kiểm tra color
  //       ],
  //     };
  //   } else if (qShoe && qPrice) {
  //     query = {
  //       $and: [
  //         { type: qShoe }, // Kiểm tra color
  //         { price: { $gte: Number(qPrice) } }, // Kiểm tra color
  //       ],
  //     };
  //   } else if (qShoe) {
  //     query = { type: qShoe };
  //   } else if (qColor) {
  //     query = { color: qColor };
  //   } else if (qPrice) {
  //     query = { price: { $gte: Number(qPrice) } };
  //   } else if (qSize) {
  //     qSizeArr = qSize.split(",");
  //     const numericSizes = qSizeArr.map((size) => parseInt(size, 10));
  //     query = {
  //       size: {
  //         $elemMatch: { ss: { $in: numericSizes } },
  //       },
  //     };
  //   } else {
  //     query = {};
  //   }

  //   let filterShoes = await Shoe.find(query);
  //   if (qNew) {
  //     filterShoes = await Shoe.find().sort({ createdAt: -1 }).limit(5);
  //   }
  //   if (!filterShoes)
  //     return res.status(500).json({ success: false, message: "cannot query" });
  //   res.status(200).json(filterShoes);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // }
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
