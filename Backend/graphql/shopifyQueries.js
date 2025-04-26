//Pre-written GraphQL queries/mutations

export const GET_PRODUCTS = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          variants(first: 5) {
            edges {
              node {
                id
                sku
                price
                inventoryQuantity
              }
            }
          }
        }
      }
    }
  }
`;
