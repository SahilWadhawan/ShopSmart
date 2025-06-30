import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, addProduct, deleteProduct, updateProduct } from "../api/api";
import ProductForm from "../components/ProductForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", stock: "", image: "" });
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("admin-auth") !== "true") {
      navigate("/admin/login");
    }
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  const handleAdd = async () => {
    await addProduct(newProduct);
    setNewProduct({ name: "", description: "", price: "", stock: "", image: "" });
    fetchAllProducts();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(p => p._id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text drop-shadow-md">Admin Dashboard</h2>

      <ProductForm product={newProduct} setProduct={setNewProduct} onSubmit={handleAdd} buttonText="Add Product" />

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-3">All Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p._id} className="bg-white shadow rounded p-4">
            {selectedProduct && selectedProduct._id === p._id ? (
              <>
                <ProductForm
                  product={selectedProduct}
                  setProduct={setSelectedProduct}
                  onSubmit={async () => {
                    await updateProduct(selectedProduct._id, selectedProduct);
                    setSelectedProduct(null);
                    fetchAllProducts();
                  }}
                  buttonText="Update"
                />
                <button
                  className="text-sm text-gray-500 mt-2"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold">{p.name}</h4>
                  <p>₹{p.price}</p>
                  <p>Stock: {p.stock}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => setSelectedProduct(p)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;