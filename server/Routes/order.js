const router = require("express").Router();
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorize,
  verifyToken,
} = require("../middleware/userVerify");
const orderController = require("../controllers/orderController");

//Get
router.get("/stat", verifyTokenAndAdmin, orderController.getStatAllOrder);
router.get(
  "/:idUser",
  verifyTokenAndAuthorize,
  orderController.getAllOrderByidUser
);
// router.get('/getDetail/:')
router.get("/", verifyTokenAndAdmin, orderController.getAllOrders);

//Post
router.post(
  "/makeOrder/:idUser",
  verifyTokenAndAuthorize,
  orderController.makeOrderbyiduser
);

router.post(
  "/searchOrder/search",
  verifyTokenAndAdmin,
  orderController.SearchOrder
);

//Put
router.put(
  "/:orderId",
  verifyTokenAndAdmin,
  orderController.changeStatusByIdOrder
);

//Delete
router.delete("/:orderId", verifyTokenAndAdmin, orderController.deleteOrder);
module.exports = router;
