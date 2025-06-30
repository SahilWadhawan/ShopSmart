import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../api/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import "../App.css"; 

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load products.");
      });
  }, []);

  const featured = products.slice(0, 3);
  const hotDeals = products.slice(3, 6);
  const editorsPick = products.slice(6, 9);
  const more = products.slice(9);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const Category = ({ title, colorClass, borderClass, items }) => (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`mb-20 p-6 rounded-xl shadow-md bg-card-bg/70 backdrop-blur-lg border-l-4 ${borderClass}`}
    >
      <h2 className={`text-3xl font-semibold mb-6 ${colorClass}`}>{title}</h2>
      <Masonry
        breakpointCols={{ default: 3, 1100: 2, 700: 1 }}
        className="flex gap-6"
        columnClassName="masonry-column"
      >
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Masonry>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-primary-bg text-white px-6 py-12 scroll-smooth">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-24"
      >
        <h1 className="text-5xl font-extrabold text-cyan-300 drop-shadow-xl tracking-tight">
          Welcome to ShopSmart
        </h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Discover curated picks, trending deals, and smart shopping - all in one place.
        </p>
        <div className="mt-8 flex justify-center gap-6">
          <a
            href="#featured"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg transition shadow-md"
          >
            Shop Now
          </a>
          <a
            href="#more"
            className="bg-white/10 hover:bg-white/20 text-cyan-300 border border-cyan-400 px-6 py-2 rounded-lg transition backdrop-blur"
          >
            Explore More
          </a>
        </div>
      </motion.div>

      {/* Product Sections */}
      {featured.length > 0 && (
        <motion.div
          id="featured" 
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className={`mb-16 p-6 rounded-lg shadow-md bg-[#1a1f2e]/80 backdrop-blur-md border-l-4 border-cyan-400`}
        >
          <h2 className="text-3xl font-semibold mb-6 text-cyan-300">Featured Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </motion.div>
      )}

      {hotDeals.length > 0 && (
        <Category
          title="Hot Deals"
          colorClass="text-orange-300"
          borderClass="border-orange-400"
          items={hotDeals}
        />
      )}
      {editorsPick.length > 0 && (
        <Category
          title="Editor's Picks"
          colorClass="text-blue-300"
          borderClass="border-blue-400"
          items={editorsPick}
        />
      )}
      {more.length > 0 && (
        <div id="more">
          <Category
            title="Explore More"
            colorClass="text-green-300"
            borderClass="border-green-400"
            items={more}
          />
        </div>
      )}
    </div>
  );
};

export default Home;