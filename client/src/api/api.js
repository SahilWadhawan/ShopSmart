import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: `${BASE_URL}`,
});

// API functions
export const fetchProducts = () => API.get('/products');
export const addProduct = (product) => API.post('/products/add', product);
export const reduceStock = (id, quantity) => API.put('/products/reduce', { id, quantity });
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, updatedData) => API.put(`/products/${id}`, updatedData);