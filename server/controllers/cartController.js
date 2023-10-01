const Cart = require("../models/Cart");

const getAll = async (req, res) => {
    try {
        const carts = await Cart.find();
        if(!carts) return res.status(200).json({success: true, message: "No cart founded", carts});
        res.status(200).json({success: true, message: "Happy watching", carts});
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

const getDetailCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.idUser});
        if(!cart) return res.status(401).json({success: false, message: "cannot found"});
        res.status(200).json({success: true, message: "Cart founded!", cart});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

const getDetailCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({_id: req.params.idCart});
        if(!cart) return res.status(401).json({success: false, message: "cannot found"});
        res.status(200).json({success: true, message: "Cart founded!", cart});
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

const addCart = async (req, res) => {
    const { idUser, ...rest } = req.body;
    const myId = req.user._id;
    try {
        const isExist = await Cart.findOne({userId: myId})
        console.log('isExist', isExist)
        if(isExist) {
            //tim id san pham trung vs id san pham trong mang shoes
            const existhoe = await Cart.findOneAndUpdate({ userId: myId, "shoes._id": isExist._id }, { $inc: { "shoes.$.amount": 1 } }, {new: true})
            if(!existhoe) {
                const result = await Cart.findOneAndUpdate({userId: myId}, { $push: { shoes: req.body } }, {new: true})
                console.log('result after add cart', result);
                return res.status(200).json({success: true, message: 'happy add cart', result});
            }
            return res.status(200).json({success: true, message: 'happy add cart', result});
        } else {
            const newCart = new Cart({
                userId: myId,    
                shoes: rest,
            })
            const saving = await newCart.save();
            if(!saving) return res.status(401).json({success: false, message: "Cannot add cart"});
            res.status(200).json({success: true, message:"happy adding", cart: saving});
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

const deleteCart = async (req, res) => { 
    //PROBLEM: cartId = undefined
    const cartId = req.params.cartId;
    const idShoeDel = req.params.idShoeDel;
    console.log('cartId', cartId)
    try {
        // const cartUser = await Cart.find({_id: cartId})
        // console.log('cartUser muon xoa shoe o trong', cartUser)
        // if(cartUser) {
        //     const result = await Cart.findOneAndUpdate({ _id: idShoeDel },)
        // }
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId },
  { $pull: { shoes: { _id: idShoeDel } } },
  { new: true }
          );
          if (updatedCart) {
            // Đã cập nhật thành công
            res.json({ success: true, message: "Sản phẩm đã được xóa khỏi giỏ hàng", cart: updatedCart });
          } else {
            // Không tìm thấy cart với id tương ứng
            res.status(404).json({ success: false, message: "Không tìm thấy giỏ hàng" });
          }
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

module.exports = {
    getAll,
    getDetailCart,
    getDetailCartByUser,
    addCart,
    deleteCart
}