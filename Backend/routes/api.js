// Backend/routes/api.js
import express from 'express';
import { getInventory, addInventory, updateInventory, deleteInventory } from '../controllers/inventory.js'; // import correctly
import { getProducts } from '../controllers/shopify.js'; // import correctly

const router = express.Router();

// Shopify Routes
router.get('/shopify/products', getProducts);

// Inventory CRUD Routes
router.get('/inventory', getInventory);
router.post('/inventory', addInventory);
router.put('/inventory/:id', updateInventory);
router.delete('/inventory/:id', deleteInventory);

router.get('/shopify/products', getProducts); // optional


export default router; // export default
