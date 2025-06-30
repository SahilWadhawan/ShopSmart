const express = require("express");
const router = express.Router();
const axios = require("axios");
const Product = require("../models/productModel1");
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  const match = message.toLowerCase().match(/add\s+(\d+)\s+(.+?)\s+to\s+cart/);

  if (match) {
    const quantity = parseInt(match[1]);
    const productName = match[2].trim();

    const product = await Product.findOne({
      name: { $regex: new RegExp(productName, "i") },
    });

    if (product) {
      return res.json({
        reply: `${product.name} (x${quantity}) added to your cart ✅`,
        action: "add_to_cart",
        product,
        quantity,
      });
    } else {
      return res.json({
        reply: "❌ No such item exists. Please write a name from the given products.",
      });
    }
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o",
        messages: [{ role: "user", content: message }],
        max_tokens: 800,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Ecommerce AI Chatbot",
        },
      }
    );
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("OpenRouter Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from OpenRouter API" });
  }
});

module.exports = router;