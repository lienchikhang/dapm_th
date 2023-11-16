const Cart = require("../models/Cart");
const Order = require("../models/Order");
const order = require("../models/Order");
const Shoe = require("../models/Shoe");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
let getAllOrderByidUser = async (req, res) => {
  //lay tat ca order theo idUser
  try {
    const userId = req.params.idUser;
    const result = await order.find({
      userId: userId,
    });
    res
      .status(200)
      .json({ message: "Get All by User success", result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Get fail" });
  }
};

let makeOrderbyiduser = async (req, res) => {
  try {
    let idUser = req.params.idUser;
    const { shoes, methodPay, name, address, phone } = req.body;
    const result = new order({
      userId: idUser,
      shoes: shoes,
      methodPay: methodPay,
      name: name,
      address: address,
      phone: phone,
    });
    await result.save();

    const PullCart = await Cart.findOneAndUpdate(
      { userId: idUser },
      {
        $pull: { shoes: {} },
      },
      {
        new: true,
      }
    );
    await descShoeCountWithSize(shoes);
    res.status(200).json({ message: "make order success", result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "make order fail" });
  }
};

let makePaymentOnline = async (req, res) => {
  try {
    const { shoes, name, address, phone, methodPay, idUser } = req.metadata;
    const rawDataBuffer = Buffer.from(shoes); // Dữ liệu dưới dạng Buffer
    const rawDataString = rawDataBuffer.toString(); // Chuyển đổi từ Buffer thành chuỗi
    const jsonShoes = JSON.parse(rawDataString); // Chuyển đổi thành đối tượng JSON
    const ShoeList = await querryToMakeOrder(jsonShoes);
    const result = new order({
      userId: idUser,
      shoes: ShoeList,
      methodPay: methodPay,
      name: name,
      address: address,
      phone: phone,
    });
    await result.save();
    await descShoeCountWithSize(ShoeList);
    await Cart.findOneAndUpdate(
      { userId: idUser },
      {
        $pull: { shoes: {} },
      },
      {
        new: true,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

const querryToMakeOrder = async (shoeList) => {
  const shoeListMax = await Promise.all(
    shoeList.map(async (shoe, index) => {
      let shoeItem = await Shoe.findById(shoe._id);
      return {
        ...shoe,
        price: shoeItem.price,
        img: shoeItem.img,
        desc: shoeItem.desc,
        color: shoeItem.color,
        type: shoeItem.type,
        name: shoeItem.name,
      };
    })
  );
  return shoeListMax;
};
let descShoeCountWithSize = (shoes) => {
  try {
    shoes.map(async (shoe) => {
      await Shoe.findOneAndUpdate(
        {
          _id: shoe._id,
          "size.ss": shoe.size,
        },
        {
          $inc: { "size.$.cs": -shoe.quantity },
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

let changeStatusByIdOrder = async (req, res) => {
  try {
    const { textStatus } = req.body;
    const result = await order.findOneAndUpdate(
      {
        _id: req.params.orderId,
      },
      {
        $set: {
          status: textStatus,
        },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "Change Status order success", result: result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "change status order fail" });
  }
};

let getAllOrders = async (req, res) => {
  const { idOrder } = req.query;
  if (idOrder) {
    try {
      const order = await Order.findById(idOrder);
      if (!order)
        return res
          .status(204)
          .json({ success: true, message: "Cannot find any order" });
      return res
        .status(200)
        .json({ success: true, message: "Happy hacking", data: order });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error", error: err });
    }
  }
  try {
    const orders = await Order.find();
    if (!orders)
      return res
        .status(204)
        .json({ success: true, message: "Cannot find any orders" });
    res.status(200).json({ success: true, message: "Happy time", orders });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: err });
  }
};

let deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const shoeList = req.body.shoes;
    IncrShoeBydeleteOrder(shoeList);
    const orderDelete = await Order.findByIdAndDelete(
      { _id: orderId },
      { new: true }
    );
    res.status(200).json({ message: "delete order success" });
  } catch (err) {
    res.status(500).json(err);
  }
};

let IncrShoeBydeleteOrder = (shoes) => {
  try {
    shoes.map(async (shoe) => {
      await Shoe.findOneAndUpdate(
        {
          _id: shoe._id,
          "size.ss": shoe.size,
        },
        {
          $inc: { "size.$.cs": shoe.quantity },
        }
      );
    });
  } catch (err) {
    console.log(err);
  }
};

let SearchOrder = async (req, res) => {
  try {
    const { name, phone, day, status } = req.body;
    const querry = {};
    if (name) {
      querry.name = name;
    }
    if (phone) {
      querry.phone = phone;
    }
    if (day) {
      const SearchDate = new Date(`${day}T00:00:00.000Z`);
      querry.createdAt = {
        $gte: SearchDate,
        $lte: new Date(SearchDate.getTime() + 24 * 60 * 60 * 1000),
      };
    }
    if (status) {
      querry.status = status;
    }
    console.log(querry);
    const orders = await Order.find(querry);
    res.status(200).json({ message: "success Search", orders });
  } catch (err) {
    console.log(err);
  }
};

const getStatAllOrder = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Order.aggregate([
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
  } catch (error) {}
};

module.exports = {
  getAllOrderByidUser,
  changeStatusByIdOrder,
  makeOrderbyiduser,
  makePaymentOnline,
  getAllOrders,
  deleteOrder,
  getStatAllOrder,
  SearchOrder,
};
