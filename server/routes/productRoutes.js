const express = require("express");
const router = express.Router();
const Product = require("../models/productModel1");
const {
  getAllProducts,
  addProduct,
  reduceStock,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.post("/add", addProduct);
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});
router.delete("/:id", deleteProduct);

module.exports = router;