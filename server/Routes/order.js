const router = require('express').Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorize, verifyToken} = require('../middleware/userVerify');
const orderController=require('../controllers/orderController')

//Get
router.get('/:idUser',verifyTokenAndAuthorize,orderController.getAllOrderByidUser)

//Post
router.post('/makeOrder/:idUser',verifyTokenAndAuthorize,orderController.makeOrderbyiduser)
router.post('/:orderId',verifyTokenAndAuthorize,orderController.changeStatusByIdOrder)
module.exports = router;