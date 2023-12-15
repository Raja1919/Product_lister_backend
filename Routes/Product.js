const express = require("express");
const Product = require("../Models/Product");
const router = express.Router();

// Add product details
router.post("/add-product", async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Find all the products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    products.length > 0
      ? res.send(products)
      : res.send({ result: "No products found" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete the selected product
router.delete("/product/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Get details of the product
router.get("/product/:id", async (req, res) => {
  try {
    const result = await Product.findById(req.params.id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Update the product after gathering its details
router.put("/product/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
