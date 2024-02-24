const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./Routes/user");
const shoeRoute = require("./Routes/shoe");
const cartRoute = require("./Routes/cart");
const cateRoute = require("./Routes/category");
const orderRoute = require("./Routes/order");
const stripeRoute = require("./Routes/Stripe");
const Database = require("./middleware/ConnectDB")
const app = express();
app.use(
  express.json({
    limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);
require("dotenv").config();
// app.use(express.json());

//cho phép truy cập path của server từ các tên miền khác
app.use(cors());


/**connect mongodb */
// mongoose
//   .connect(process.env.MONGO_DB)
//   .then(() => {
//     console.log("connect successfully");
//   })
//   .catch((err) => console.log(err));
const dbInstance = Database.getInstance();


app.use("/api/user/", userRoute);
app.use("/api/shoe", shoeRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", cateRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);

app.listen(process.env.PORT, () => console.log("server is running"));
