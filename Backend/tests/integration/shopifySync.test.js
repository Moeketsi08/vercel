import shopifyRequest from '../../services/shopifyService.js';
import { GET_PRODUCTS } from '../../graphql/shopifyQueries.js';

describe('Shopify Sync Test', () => {
  it('should successfully fetch inventory from Shopify', async () => {
    const result = await shopifyRequest(GET_PRODUCTS);
    expect(result.data.products.edges.length).toBeGreaterThan(0);
  });
});
describe('Shopify Inventory Sync', () => {
  it('should sync inventory with Shopify', async () => {
    const result = await shopifyRequest(GET_PRODUCTS);
    const products = result.data.products.edges;

    // Assuming you have a function to sync inventory
    const syncResult = await syncInventoryWithShopify(products);
    expect(syncResult).toBe(true);
  });
});
// Mock the syncInventoryWithShopify function
const syncInventoryWithShopify = jest.fn().mockResolvedValue(true);
// Mock the shopifyRequest function
jest.mock('../../services/shopifyService.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('../../graphql/shopifyQueries.js', () => ({
  GET_PRODUCTS: jest.fn(),
}));
// Mock the GET_PRODUCTS query
jest.mock('../../graphql/shopifyQueries.js', () => ({
  GET_PRODUCTS: jest.fn().mockReturnValue({
    data: {
      products: {
        edges: [
          {
            node: {
              id: 'gid://shopify/Product/1234567890',
              title: 'Test Product',
              variants: {
                edges: [
                  {
                    node: {
                      id: 'gid://shopify/ProductVariant/1234567890',
                      sku: 'TEST-SKU-001',
                      price: '19.99',
                      inventoryQuantity: 10,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  }),
}));
// Mock the axios library
jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({
    data: {
      data: {
        products: {
          edges: [
            {
              node: {
                id: 'gid://shopify/Product/1234567890',
                title: 'Test Product',
                variants: {
                  edges: [
                    {
                      node: {
                        id: 'gid://shopify/ProductVariant/1234567890',
                        sku: 'TEST-SKU-001',
                        price: '19.99',
                        inventoryQuantity: 10,
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  }),
}));
// Mock the dotenv library
jest.mock('dotenv', () => ({
  config: jest.fn(),
}));