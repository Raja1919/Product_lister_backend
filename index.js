const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const productRouter = require("./Routes/Product.js");
const userRouter = require("./Routes/User.js");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// connect to mongodb
const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log(error);
  });
// Use the routers with their respective paths
app.use("/api", productRouter);
app.use("/api", userRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
