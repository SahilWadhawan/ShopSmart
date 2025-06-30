import React from "react";

const ProductForm = ({ product, setProduct, onSubmit, buttonText }) => {
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit();         
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 w-full"
      />
      <input
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full"
      />
      <input
        name="price"
        type="number"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 w-full"
      />
      <input
        name="stock"
        type="number"
        value={product.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 w-full"
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        {buttonText}
      </button>
    </form>
  );
};

export default ProductForm;