const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./Routes/user');
const shoeRoute = require('./Routes/shoe');
const cartRoute = require('./Routes/cart');
const app = express();

require('dotenv').config()
app.use(express.json());

//cho phép truy cập path của server từ các tên miền khác
app.use(cors());

/**connect mongodb */
mongoose.connect(process.env.MONGO_DB)
.then(()=>{console.log("connect successfully")})
.catch((err) => console.log(err))
  

app.use('/api/user/',userRoute)
app.use('/api/shoe', shoeRoute)
app.use('/api/cart', cartRoute)
app.listen(process.env.PORT, () => console.log("server is running"));52