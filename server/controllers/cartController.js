
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
        const carts = await Cart.find({userId: req.params.idUser});
        if(!carts) return res.status(401).json({success: false, message: "cannot found"});
        res.status(200).json({success: true, message: "Cart founded!", carts});
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
    const { shoes, totalAmount, totalPrice, state} = req.body;
    try {
        const newCart = new Cart({
            userId: req.user._id,
            shoes,
            totalAmount,
            totalPrice,
            state
        })

        const saving = await newCart.save();
        if(!saving) return res.status(401).json({success: false, message: "Cannot add cart"});
        res.status(200).json({success: true, message:"happy adding", cart: saving});
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
}