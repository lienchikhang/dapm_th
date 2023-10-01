const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken =  (req, res, next) => {
    const authHeader= req.headers.token;
    if(!authHeader) return res.status(401).json({success: false, message: "token not founded"})
    const token = authHeader.split(' ')[1];
    if(!token) return res.status(401).json("Access token not found!")
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, payload) => {
        if(err) return res.status(401).json({success: false, message: "Invalid token"});
        if(!payload) return res.status(401).json({success: false, message: "error"});
        req.user = payload;
        console.log('payload', payload)
        next();
    })
}

const verifyTokenAndAdmin = (req, res, next)=> {
    verifyToken(req, res, ()=> {
        if(!req.user.isAdmin) return res.status(401).json({success: false, message: "You are not authorized"})
        next();
    })
}

const verifyTokenAndAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log('+',req.user._id)
        console.log('-',req.params.idUser)

        if(req.user._id === req.params.idUser || req.user.isAdmin) {
            next();
        } else {
            res.status(401).json({success: false, message: "You are not allowed to do that"})
        }
    })
}

module.exports = {
    verifyTokenAndAdmin,
    verifyTokenAndAuthorize,
    verifyToken
}