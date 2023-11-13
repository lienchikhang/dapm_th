const mongoose = require('mongoose')
const order = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    shoes: {
        type: Array,
        require: true
    },
    methodPay: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true,
        default: "Chưa giao"
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    }
}, { timestamps: true })
module.exports = new mongoose.model("Order", order)