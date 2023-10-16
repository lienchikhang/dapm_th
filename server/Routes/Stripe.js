const express = require("express");
const Stripe = require("stripe");
const { makePaymentOnline } = require("../controllers/orderController");
require("dotenv").config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// tao session thanh toan
router.post("/create-checkout-session", async (req, res) => {
  try {
    console.log(req.body);
    const user = await stripe.customers.create({
      metadata: {
        idUser: req.body.idUser,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        methodPay: req.body.methodPay,
        shoes: JSON.stringify(req.body.shoes),
      },
    });

    const line_items = req.body.shoes.map((shoe) => {
      return {
        price_data: {
          currency: "vnd",
          product_data: {
            name: shoe.name,
            images: [shoe.img],
            metadata: {
              id: shoe._id,
            },
          },
          unit_amount: shoe.price,
        },
        quantity: shoe.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      customer: user.id,
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.Success_url}`,
      cancel_url: `${process.env.fail_url}`,
    });

    res.send({ url: session.url });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
