const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
  verifyToken,
} = require("../middleware/userVerify");
const Cart = require("../models/Cart");
const cartController = require("../controllers/cartController");
const router = require("express").Router();

//GET
router.get("/all", verifyTokenAndAdmin, cartController.getAll);

router.get("/:idUser", verifyTokenAndAuthorize, cartController.getDetailCart);

// router.get('/:idUser/:idCart', verifyTokenAndAuthorize, cartController.getDetailCartByUser) 1 user chi co 1 cart

//POST
router.post("/add", verifyToken, cartController.addCart);
router.post("/increase", verifyToken, cartController.increaseCart);
router.post("/desc", verifyToken, cartController.descCart);

//DELETE
router.delete(
  "/delete/:idUser/:cartId/:idShoeDel/:sizeShoe",
  verifyTokenAndAuthorize,
  cartController.deleteCart
);

module.exports = router;
