import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const { cart, setCart, removeFromCart, totalAmount } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
        cartItems: cart,
      });
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      toast.error("Payment failed!");
    }
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-[#0e1525] via-[#1b2334] to-[#0f172a] text-white">
      <h2 className="text-3xl font-bold mb-8 text-cyan-300">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-card-bg/80 backdrop-blur-md border border-white/10 p-5 rounded-xl shadow-lg flex justify-between items-center"
              >
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-400">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-gray-300 font-medium">Qty: {item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-right">
            <h3 className="text-xl font-semibold mb-2">Total: ₹{totalAmount}</h3>
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-xl transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;