const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  userId: {
    type: String,
  },
});

// Create the Product model using the productSchema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
