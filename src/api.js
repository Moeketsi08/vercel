import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Shopify Integration
export const fetchShopifyProducts = () => API.get('/shopify/products');

// Inventory CRUD
export const getInventory = () => API.get('/inventory');
export const addInventory = (item) => API.post('/inventory', item);
export const updateInventory = (id, updates) => API.put(`/inventory/${id}`, updates);
export const deleteInventory = (id) => API.delete(`/inventory/${id}`);