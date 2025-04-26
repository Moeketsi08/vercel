import express from 'express';
import axios from 'axios';

const router = express.Router();

// Replace with your app's private credentials or use dotenv
const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;

router.post('/connect',  (req, res) => {
  const { email, shopName } = req.body;

  try {
    // Optional: Validate shop format
    const storeUrl = `https://${shopName}.myshopify.com`;

    // Stubbed: send confirmation or logic to install app / fetch token
    console.log(`✅ Shopify store ${storeUrl} linked with admin email ${email}`);

    // Return fake success for dev purposes
    return res.status(200).json({ success: true, storeUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to connect to Shopify' });
  }
});

//Orders
router.get('/orders', async (req, res) => {
    try {
      const storeName = process.env.SHOPIFY_STORE_DOMAIN;
      const token = process.env.SHOPIFY_ACCESS_TOKEN;
  
      const url = `https://${storeName}.myshopify.com/admin/api/2023-04/orders.json`;
      console.log('➡️ Fetching orders from:', url);
  
      const response = await axios.get(url, {
        headers: {
          'X-Shopify-Access-Token': token,
          'Content-Type': 'application/json',
        },
      });
  
      res.json(response.data.orders);
    } catch (err) {
      console.error('❌ Shopify API error:', err.response?.status, err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  });
  
  

// Fetch Inventory (Locations & Inventory Levels)
router.get('/inventory', async (req, res) => {
  try {
    const storeName = process.env.SHOPIFY_STORE_DOMAIN;
    const token = process.env.SHOPIFY_ACCESS_TOKEN;

    // Step 1: Get all product variants
    const varurl = `https://${storeName}.myshopify.com/admin/api/2023-04/variants.json`;
    const variantsRes = await axios.get(varurl, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    const variants = variantsRes.data.variants;
    const ids = variants.map(v => v.inventory_item_id).join(',');

    // Step 2: Fetch inventory using those IDs
    const resurl = `https://${storeName}.myshopify.com/admin/api/2023-04/inventory_items.json?ids=${ids}`;
    const inventoryRes = await axios.get(resurl, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
      },
    });

    const inventoryItems = inventoryRes.data.inventory_items;

    // Step 3: Match title to inventory items
    const inventoryWithTitles = inventoryItems.map(item => {
      const variant = variants.find(v => v.inventory_item_id === item.id);
      return {
        ...item,
        title: variant ? variant.title : 'Unknown',
      };
    });

    console.log('➡️ Fetching inventory with titles from:', resurl);
    res.json(inventoryWithTitles);

  } catch (err) {
    console.error('❌ Shopify Inventory Fetch Error:', err.response?.status, err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

  
  
  // Fetch Customers (as Consignees)
  router.get('/consignees', async (req, res) => {
    try {
        const storeName = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_ACCESS_TOKEN;
    
        const url = `https://${storeName}.myshopify.com/admin/api/2023-04/customers.json`;
        console.log('➡️ Fetching consignees from:', url);

      const response = await axios.get(url, {
        headers: {
          'X-Shopify-Access-Token': token,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data.customers);
    } catch (err) {
      console.error('❌ Shopify API error:', err.response?.status, err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch consignees' });
    }
  });
  
  // Fetch Payments (from Orders)
  router.get('/payments', async (req, res) => {
    try {
        const storeName = process.env.SHOPIFY_STORE_DOMAIN;
        const token = process.env.SHOPIFY_ACCESS_TOKEN;

        const url = `https://${storeName}.myshopify.com/admin/api/2023-04/orders.json?fields=id,total_price,currency,financial_status`;
        console.log('➡️ Fetching payments from:', url);


      const response = await axios.get(url, {
        headers: {
          'X-Shopify-Access-Token': token,
          'Content-Type': 'application/json',
        },
      });
      // You can customize this further
      const payments = response.data.orders.map(order => ({
        id: order.id,
        amount: order.total_price,
        status: order.financial_status,
        currency: order.currency,
      }));
      res.json(payments);
    } catch (err) {
      console.error('❌ Shopify API error:', err.response?.status, err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch payments' });
    }
  });  

export default router;
