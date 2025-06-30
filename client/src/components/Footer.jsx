import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#101827] text-gray-300 py-6 mt-16 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm space-y-3 md:space-y-0">
        <div>
          © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">ShopSmart</span>. All rights reserved.
        </div>
        <div className="space-x-4">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/cart" className="hover:text-cyan-400">Cart</Link>
          <Link to="/admin/login" className="hover:text-cyan-400">Admin</Link>
        </div>
        <div>
          Need help? <a href="mailto:support@shopsmart.com" className="text-cyan-400 hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;