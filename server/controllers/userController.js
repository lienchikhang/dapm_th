let User = require('../models/User');

let register = async (req, res) => {
    const findUser = req.body.username;
    try {
        const findedUser = await User.findOne({username: findUser });
        if(findedUser) res.status(500).json('Username is exist');
        const newUser =new User({
            username: req.body.username,
            password: req.body.password,
        })
        await newUser.save();
        res.status(200).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json('Username is existtt')
    }
};
let login = async (req, res) => {
    const findUser = req.body.username;
    try {
        const findedUser = await User.findOne({username: findUser });
        if(findedUser) res.status(500).json('Username is exist');
        const newUser =new User({
            username: req.body.username,
            password: req.body.password,
        })
        await newUser.save();
        res.status(200).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(500).json('Username is existtt')
    }
}
module.exports = {
    register,
    login
}