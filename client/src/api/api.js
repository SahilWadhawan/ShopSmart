import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Change to your deployed backend later
});

export const fetchProducts = () => API.get('/products');
export const addProduct = (product) => API.post('/products/add', product);
export const reduceStock = (id, quantity) => API.put('/products/reduce', { id, quantity });
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, updatedData) =>
  axios.put(`http://localhost:5000/api/products/${id}`, updatedData);