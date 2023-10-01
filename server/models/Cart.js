const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    shoes: {
        type: Array,
        require: true
    },
    // totalAmount: {
    //     type: Number,
    //     require: true
    // },
    // totalPrice: {
    //     type: Number,
    //     require: true
    // },
    // state: {
    //     type: Boolean,
    //     require: true
    // }

}, {timestamps: true});

module.exports = new mongoose.model('Cart', cartSchema);

