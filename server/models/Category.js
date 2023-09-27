const mongoose = require('mongoose');

const cateSchema = new mongoose.Schema({
    catName: {
        type: String
    }
}, {timestamps: true})

module.exports = new mongoose.model("Category", cateSchema);