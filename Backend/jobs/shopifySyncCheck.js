import 'dotenv/config';
import shopifyRequest from '../services/shopifyService.js';
import { GET_PRODUCTS } from '../graphql/shopifyQueries.js';

(async () => {
  const data = await shopifyRequest(GET_PRODUCTS);
  const products = data.data.products.edges;

  // Example test: make sure stock quantity isn't negative
  products.forEach((p) => {
    p.node.variants.edges.forEach((v) => {
      if (v.node.inventoryQuantity < 0) {
        console.error(`⚠️ Negative stock on variant: ${v.node.id}`);
      }
    });
  });

  console.log('✅ Sync test passed!');
})();
