const router = require("express").Router();
const Shoe = require("../models/Shoe");
const shoeController = require("../controllers/shoeController");
const {
  verifyTokenAndAdmin,
  verifyToken,
} = require("../middleware/userVerify");

//GET
router.get("/:id", shoeController.getShoe);
router.get("/", shoeController.getAll);

//PUT
router.put("/:id", shoeController.updateShoe);

//POST
router.post("/create", verifyTokenAndAdmin, shoeController.createShoe);
router.post("/SearchShoe", shoeController.SearchShoe);
//DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, shoeController.deleteShoe);

module.exports = router;
