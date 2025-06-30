const Product = require("../models/productModel1");

exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

exports.addProduct = async (req, res) => {
  const { name, description, price, image, stock } = req.body;
  try {
    const newProduct = new Product({ name, description, price, image, stock });
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ error: "Failed to add product" });
  }
};

exports.reduceStock = async (req, res) => {
  const { id, quantity } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.stock -= quantity;
    await product.save();
    res.json({ message: "Stock updated", product });
  } catch (err) {
    res.status(500).json({ error: "Error updating stock" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Delete failed" });
  }
};