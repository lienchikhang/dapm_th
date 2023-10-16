const express = require("express");
const Stripe = require("stripe");
const { makeOrderbyiduser } = require("../controllers/orderController");
require("dotenv").config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
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
