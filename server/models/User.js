const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
    birtday: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }
}, { timestamps: true })

module.exports = new mongoose.model("User", User);