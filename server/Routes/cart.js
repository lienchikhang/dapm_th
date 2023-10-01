const { verifyTokenAndAdmin, verifyTokenAndAuthorize, verifyToken} = require('../middleware/userVerify');
const Cart = require('../models/Cart');
const cartController = require('../controllers/cartController');
const router = require('express').Router();

//GET
router.get('/all', verifyTokenAndAdmin, cartController.getAll)

router.get('/:idUser', verifyTokenAndAuthorize, cartController.getDetailCart)

router.get('/:idUser/:idCart', verifyTokenAndAuthorize, cartController.getDetailCartByUser)

//POST
router.post('/add',verifyToken, cartController.addCart)


module.exports = router