import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantityToAdd = 1) => {
  const existingItem = cart.find((item) => item._id === product._id);
  const currentQtyInCart = existingItem ? existingItem.quantity : 0;
  const totalRequested = currentQtyInCart + quantityToAdd;

  if (totalRequested > product.stock) {
    toast.error(`Only ${product.stock} items in stock`);
    return;
  }

  const updatedCart = existingItem
    ? cart.map((item) =>
        item._id === product._id ? { ...item, quantity: totalRequested } : item
      )
    : [...cart, { ...product, quantity: quantityToAdd }];

  setCart(updatedCart);
  toast.success("Item added to cart");
};

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    toast.info("Removed from cart.");
  };

  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};