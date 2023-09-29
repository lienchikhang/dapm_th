const Shoe = require('../models/Shoe.js')


//GET
const getShoe = async (req, res) => {
    const idShoe = req.params.id;
    try {
        const shoe = await Shoe.findById(idShoe);
        shoe ? 
          res.status(200).json(shoe) 
        : res.status(500).json("san pham khong co");
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

const getAll = async (req, res) => {
    let qShoe = req.query.hangShoe;
    let qColor = req.query.color;
    console.log(qShoe)
    console.log({qShoe, qColor})
    try {
        if(qShoe && qColor) {
            const filterShoes = await Shoe.find({$and: [
                { category: { $elemMatch: { $eq: qShoe } } }, // Kiểm tra type
                { category: { $elemMatch: { $eq: qColor } } }, // Kiểm tra color
              ],})
                if(!filterShoes) return res.status(500).json({success: false, message: 'cannot query'})
                console.log(filterShoes)
                res.status(200).json(filterShoes)
        } else if(qShoe) {
            const filterShoes = await Shoe.find({category: { $elemMatch: { $eq: qShoe }}})
                if(!filterShoes) return res.status(500).json({success: false, message: 'cannot query'})
                console.log(filterShoes)
                res.status(200).json(filterShoes)
        }
        else {
            const shoes = await Shoe.find();
            res.status(200).json(shoes);
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

//POST
const createShoe = async (req, res) => {
    const {isAdmin} = req.user;
    if(!isAdmin) return res.status(401).json({success: false, message: "you are not authorized"})
    const newShoe = new Shoe({
        size: req.body.size,
        name: req.body.name,
        price: req.body.price,
        img: req.body.img,
        desc: req.body.desc,
        color: req.body.color,
        category: req.body.category
    })
    try {
        await newShoe.save();
        res.status(200).json(newShoe);
    } catch(err) {
        res.status(500).json(err);
    }
    
}

//DELETE
const deleteShoe = async (req, res) => {
    const idDeleted = req.params.id;
    try {
        const deleteShoe = await Shoe.findByIdAndDelete({_id: idDeleted});
        if(!deleteShoe) return res.status(401).json({success: false, message: "Shoe not found"})
        res.status(200).json({success: true, message: "Delete successfully!", shoe: deleteShoe})
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false, message: "Internal server error", error: err})
    }
}

module.exports = {
    getAll,
    getShoe,
    createShoe,
    deleteShoe
}