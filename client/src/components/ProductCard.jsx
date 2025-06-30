import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrease = () => setQuantity((q) => Math.max(q - 1, 1));

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group bg-card-bg/70 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg border border-white/10"
    >
      {/* Image Section */}
      <div className="bg-white h-48 p-3 flex justify-center items-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm text-white flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <p className="text-sm mb-2 text-gray-300">{product.description}</p>
        <p className="text-lg font-bold text-cyan-300 mb-1">₹{product.price}</p>
        <p className="text-sm text-gray-400 mb-2">Stock: {product.stock}</p>
        <div className="flex items-center space-x-2 bg-gray-800 px-3 py-1 rounded-full mb-2">
          <button onClick={decrease} className="text-white hover:text-cyan-400">−</button>
          <span className="w-5 text-center">{quantity}</span>
          <button onClick={increase} className="text-white hover:text-cyan-400">+</button>
        </div>
        <button
          className="bg-cyan-500 hover:bg-cyan-600 text-white py-1.5 px-4 rounded transition"
          onClick={() => addToCart(product, quantity)}
        >
          Add to Cart
        </button>
      </motion.div>

      {/* Static Content Fallback */}
      <div className="p-5 space-y-1 z-0 group-hover:opacity-20 transition-opacity duration-300">
        <h2 className="font-semibold text-xl">{product.name}</h2>
        <p className="text-sm text-gray-400">{product.description}</p>
        <div className="text-cyan-400 text-lg font-bold mt-1">₹{product.price}</div>
        <p className="text-sm text-gray-500">In Stock: {product.stock}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;