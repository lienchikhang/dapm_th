const router = require('express').Router();
const userController = require('../controllers/userController')
const { verifyTokenAndAdmin, verifyToken } = require('../middleware/userVerify');

//GET
router.get('/stats',verifyTokenAndAdmin, userController.stats);

//POST
router.post('/register',userController.register);
router.post('/login',userController.login);

//PUT
router.put('/resetPass/:id',userController.resetPass)

module.exports = router;