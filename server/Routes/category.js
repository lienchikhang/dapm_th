const router = require('express').Router();
const { verifyTokenAndAdmin } = require('../middleware/userVerify');
const cateController = require('../controllers/cateController');

router.get('/', cateController.getCategory)
router.post('/create', verifyTokenAndAdmin, cateController.createCate)
module.exports = router