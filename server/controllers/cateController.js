const Category = require('../models/Category');
const getCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({success: true, message: "Happy category", data: categories});
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

const createCate = async (req, res) => {
    const {catName} = req.body;
    try {
        const newCate = new Category({
            catName
        })
        await newCate.save();
        res.status(200).json({success: true, message: "happy cate", newCate})
    } catch(err) {
        console.log(err)
        res.status(500).json({success: false, message: 'Internal server error', error: err})
    }
}

module.exports = {
    getCategory,
    createCate
}