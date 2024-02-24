const { NotiFicationFactory } = require("../Pattern/FactoryMethodPattern/FactoryMethod");
const Cart = require("../models/Cart");
const Factory = new NotiFicationFactory()
const NotificationSuccess = Factory.CreateNotification('success')
const NotificationError = Factory.CreateNotification('error')
const getAll = async (req, res) => {
  try {
    const carts = await Cart.find();
    if (!carts)
      return res
        .status(200)
        .json({ NotificationSuccess, carts });
    res.status(200).json({ NotificationSuccess, carts });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ NotificationError, error: err });
  }
};

const getDetailCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.idUser });
    return res
      .status(201)
      .json({ NotificationSuccess, cart });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ NotificationError, error: err });
  }
};

// const getDetailCartByUser = async (req, res) => {
//     try {
//         const cart = await Cart.findOne({ _id: req.params.idCart });
//         if (!cart) return res.status(401).json({ success: false, message: "cannot found" });
//         res.status(200).json({ success: true, message: "Cart founded!", cart });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ success: false, message: "Internal server error", error: err })
//     }
// }

const addCart = async (req, res) => {
  const { ...rest } = req.body;
  const myId = req.user._id;
  const size = req.body.size;
  try {
    const isExist = await Cart.findOne({ userId: myId });
    // console.log('isExist', isExist)

    if (isExist) {
      //tim id san pham trung vs id san pham trong mang shoes
      const existshoe = await Cart.findOneAndUpdate(
        { userId: myId, "shoes._id": rest._id, "shoes.size": size },
        { $inc: { "shoes.$.quantity": 1 } },
        { new: true }
      );
      if (!existshoe) {
        const result = await Cart.findOneAndUpdate(
          { userId: myId },
          { $push: { shoes: req.body } },
          { new: true }
        );
        console.log("push giay moi vao mang");
        return res
          .status(200)
          .json({ result, NotificationSuccess });
      }
      return res
        .status(200)
        .json({ NotificationSuccess, existshoe });
    } else {
      const newCart = new Cart({
        userId: myId,
        shoes: rest,
      });
      const saving = await newCart.save();
      if (!saving)
        return res
          .status(401)
          .json({ NotificationError, message: "Cannot add cart" });
      res
        .status(200)
        .json({ NotificationSuccess, cart: saving });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ NotificationError, error: err });
  }
};

const increaseCart = async (req, res) => {
  const { shoeId, size } = req.body;
  const myId = req.user._id;

  try {
    const result = await Cart.findOneAndUpdate(
      {
        userId: myId,
        shoes: {
          $elemMatch: {
            _id: shoeId,
            size: size,
          },
        },
      },
      { $inc: { "shoes.$.quantity": 1 } },
      { new: true }
    );
    res
      .status(200)
      .json({ NotificationSuccess, message: "Increase shoe quantity success", newListCart: result });
  } catch (err) {
    console.log(err);
  }
};

const descCart = async (req, res) => {
  const { shoeId, size } = req.body;
  const myId = req.user._id;
  try {
    const existshoe = await Cart.findOneAndUpdate(
      {
        userId: myId,
        shoes: {
          $elemMatch: {
            _id: shoeId,
            size: size,
          },
        },
      },
      { $inc: { "shoes.$.quantity": -1 } },
      { new: true }
    );
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: myId },
      { $pull: { shoes: { quantity: 0 } } },
      { new: true }
    );
    if (updatedCart && existshoe) {
      res
        .status(200)
        .json({ NotificationSuccess, message: "take shoe out array", newListCart: updatedCart });
    } else {
      res
        .status(200)
        .json({ NotificationSuccess, message: "make shoe desc", newListCart: updatedCart });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (req, res) => {
  //PROBLEM: cartId = undefined
  const cartId = req.params.cartId;
  const idShoeDel = req.params.idShoeDel;
  const shoeSize = req.params.sizeShoe;
  console.log({ cartId, idShoeDel, shoeSize });
  try {
    // const cartUser = await Cart.find({_id: cartId})
    // console.log('cartUser muon xoa shoe o trong', cartUser)
    // if(cartUser) {
    //     const result = await Cart.findOneAndUpdate({ _id: idShoeDel },)
    // }
    const updatedCart = await Cart.findOneAndUpdate(
      { _id: cartId },
      { $pull: { shoes: { _id: idShoeDel, size: Number(shoeSize) } } },
      { new: true }
    );
    if (updatedCart) {
      // Đã cập nhật thành công
      res.json({
        NotificationSuccess,
        message: "Sản phẩm đã được xóa khỏi giỏ hàng",
        cart: updatedCart,
      });
    } else {
      // Không tìm thấy cart với id tương ứng
      res
        .status(404)
        .json({ NotificationError, message: "Không tìm thấy giỏ hàng" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ NotificationError, error: err });
  }
};

module.exports = {
  getAll,
  getDetailCart,
  // getDetailCartByUser,
  addCart,
  deleteCart,
  descCart,
  increaseCart,
};
