const router = require('express').Router();
const userController = require('../controllers/userController')

//GET
router.get('/stats', userController.stats);

//POST
router.post('/register',userController.register);
router.post('/login',userController.login);

//PUT
router.put('/resetPass/:id',userController.resetPass)

module.exports = router;