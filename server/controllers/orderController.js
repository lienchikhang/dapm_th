const Cart = require('../models/Cart')
const order = require('../models/Order')
const Shoe = require('../models/Shoe')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let getAllOrderByidUser = async (req, res) => { //lay tat ca order theo idUser
    try {
        const userId = req.params.idUser
        const result = await order.find({
            userId: userId

        })
        res.status(200).json({ message: "Get All by User success", result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Get fail" })
    }
}

let makeOrderbyiduser = async (req, res) => {
    try {
        let idUser = req.params.idUser
        const { shoes, methodPay, name, address, phone } = req.body
        const result = new order({
            userId: idUser,
            shoes: shoes,
            methodPay: methodPay,
            name: name,
            address: address,
            phone: phone
        })
        await result.save()

        const PullCart = await Cart.findOneAndUpdate({ userId: idUser }, {
            $pull: { shoes: {} }
        }, {
            new: true
        })
        await descShoeCountWithSize(shoes)
        res.status(200).json({ message: "make order success", result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "make order fail" })
    }
}

let makePaymentOnline = async (req, res) => {
    try {
        const { shoes, name, address, phone, methodPay, idUser } = req.metadata
        const rawDataBuffer = Buffer.from(shoes); // Dữ liệu dưới dạng Buffer
        const rawDataString = rawDataBuffer.toString(); // Chuyển đổi từ Buffer thành chuỗi
        const jsonData = JSON.parse(rawDataString); // Chuyển đổi thành đối tượng JSON
        const result = new order({
            userId: idUser,
            shoes: jsonData,
            methodPay: methodPay,
            name: name,
            address: address,
            phone: phone,
        })
        await result.save()
        await descShoeCountWithSize(jsonData)
        await Cart.findOneAndUpdate({ userId: idUser }, {
            $pull: { shoes: {} }
        }, {
            new: true
        })
    } catch (err) {
        console.log(err)
    }
}

let descShoeCountWithSize = (shoes) => {
    shoes.map(async (shoe) => {
        await Shoe.findOneAndUpdate({
            _id: shoe._id,
            "size.ss": shoe.size
        },
            {
                $inc: { "size.$.cs": -shoe.quantity }
            },
        )
    })
}

let changeStatusByIdOrder = async (req, res) => {
    try {
        const { textStatus } = req.body
        const result = await order.findOneAndUpdate({
            _id: req.params.orderId
        }, {
            $set: {
                "status": textStatus
            }
        }
        )
        res.status(200).json({ message: "Change Status order success", result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "change status order fail" })
    }
}

module.exports = {
    getAllOrderByidUser,
    changeStatusByIdOrder,
    makeOrderbyiduser,
    makePaymentOnline
}