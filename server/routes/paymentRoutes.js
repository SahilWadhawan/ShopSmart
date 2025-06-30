const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Product = require("../models/productModel1");

router.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, 
      },
      quantity: item.quantity > 0 ? item.quantity : 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cart",
    });

    for (const item of cartItems) {
      const product = await Product.findById(item._id);
      if (product) {
        product.stock = Math.max(product.stock - item.quantity, 0);
        await product.save();
      }
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message, error);
    res.status(500).json({ error: "Stripe session creation failed." });
  }
});

module.exports = router;