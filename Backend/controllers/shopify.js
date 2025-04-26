// /controllers/shopify.js
import axios from 'axios';

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_TOKEN = process.env.SHOPIFY_TOKEN;

export const getProducts = async (req, res) => {
  try {
    const response = await axios.get(
      `https://${SHOPIFY_STORE}.myshopify.com/admin/api/2023-07/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': SHOPIFY_TOKEN,
          'Content-Type': 'application/json',
        },
      }
    );
    res.json(response.data.products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
