export interface InventoryItem {
    title: string;
    shopifyProductId: string;
    shopifyVariantId: string;
    sku: string;
    quantity: number;
    price: number;
    condition: string;
    addedBy: 'store' | 'consignee';
    ownerId: string;
    uniqueItemId: string;
  }
  