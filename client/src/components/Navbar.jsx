import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-[#141b2d] text-white px-6 py-4 shadow-md backdrop-blur-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md"
        >
          ShopSmart
        </Link>

        {/* Tagline */}
        <div className="hidden md:block italic text-gray-300 tracking-wide">
          Empowering Smart Purchases
        </div>

        {/* Nav Links */}
        <nav className="flex space-x-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-cyan-400 transition">Home</Link>

          <div className="relative">
            <Link
              to="/cart"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <FaShoppingCart />
              Cart
            </Link>

            {/* Cart Count Badge */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                {cart.length}
              </span>
            )}
          </div>

          <Link
            to="/admin/login"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 rounded transition"
          >
            Admin Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
