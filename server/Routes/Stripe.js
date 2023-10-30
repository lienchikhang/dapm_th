const express = require("express");
const Stripe = require("stripe");
const { makePaymentOnline } = require("../controllers/orderController");
require("dotenv").config();
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// tao session thanh toan
router.post("/create-checkout-session", async (req, res) => {
  try {
    const shoeList = req.body.shoes
    const shoeListMinimize = shoeList.map((shoe, index) => {
      return {
        _id: shoe._id,
        size: shoe.size,
        quantity: shoe.quantity
      }
    })

    const user = await stripe.customers.create({
      metadata: {
        idUser: req.body.idUser,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        methodPay: req.body.methodPay,
        shoes: JSON.stringify(shoeListMinimize)
      }
    })
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
    console.log(err)
  }
});

router.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    webhookSecret = process.env.STRIPE_WEB_HOOK;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          webhookSecret
        );
      } catch (err) {
        console.log(` Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          await makePaymentOnline(customer);
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  }
);
module.exports = router;
