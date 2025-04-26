import 'dotenv/config';
import axios from 'axios';

const store = process.env.SHOPIFY_STORE;
const token = process.env.SHOPIFY_ACCESS_TOKEN;

export default async function shopifyRequest(query, variables = {}) {
  if (!store || !token) {
    throw new Error("Missing Shopify environment variables.");
  }

  const response = await axios.post(
    `https://${store}/admin/api/2023-04/graphql.json`,
    { query, variables },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': token,
      },
    }
  );

  return response.data;
}


export const GET_PRODUCTS = `
  {
    products(first: 50) {
      edges {
        node {
          id
          title
          variants(first: 10) {
            edges {
              node {
                id
                inventoryQuantity
                price
                sku
              }
            }
          }
        }
      }
    }
  }
`;
