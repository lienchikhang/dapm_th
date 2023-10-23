const router = require('express').Router();
const userController = require('../controllers/userController')
const { verifyTokenAndAdmin, verifyToken } = require('../middleware/userVerify');


//route check user login or not

//GET
router.get('/stats', verifyTokenAndAdmin, userController.stats);
router.get('/', verifyToken, userController.checkLogin)
router.get('/takeInfor/:idUser', verifyToken, userController.takeInfoUserById)

//POST
router.post('/register', userController.register);
router.post('/login', userController.login);

//PUT
router.put('/resetPass/:id', userController.resetPass)
router.put('/changeInfor/:idUser', verifyToken, userController.changeInfor)

module.exports = router;