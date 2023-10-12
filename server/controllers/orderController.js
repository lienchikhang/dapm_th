const Cart = require('../models/Cart')
const order = require('../models/Order')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
let getAllOrderByidUser = async (req, res) => { //lay tat ca order theo idUser
    try {
        const userId = req.params.idUser
        const result = await order.find({
            $elemMatch: {
                userId: userId
            }
        }, { new: true })
        res.status(200).json({ message: "Get All by User success", result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Get fail" })
    }
}

let makeOrderbyiduser = async (req, res) => {
    try {
        const idUser = req.params.idUser
        const { shoes, methodPay, name, address } = req.body
        const result = new order({
            userId: idUser,
            shoes: shoes,
            methodPay: methodPay,
            name: name,
            address: address
        })
        await result.save()

        const PullCart = await Cart.findOneAndUpdate({ userId: idUser }, {
            $pull: { shoes: {} }
        }, {
            new: true
        })

        res.status(200).json({ message: "make order success", result: result })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "make order fail" })
    }
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
}