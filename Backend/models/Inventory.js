// /Backend/models/inventory.js

const mongoose = require('mongoose');

// Mongoose schema for inventory items in the database.
// This defines the structure and rules for how inventory data is stored.
const InventorySchema = new mongoose.Schema({
  shopifyProductId: { type: String, required: true }, // Link to Shopify product
  consignorId: { type: String, required: true },       // ID of the person consigning the item
  sku: { type: String, unique: true },                 // Unique stock-keeping unit identifier
  title: String,                                       // Product name/title
  quantity: { type: Number, default: 0 },              // Available quantity
  costPrice: Number,                                   // How much the store paid the consignor
  retailPrice: Number,                                 // Price it will be sold for
  status: {
    type: String,
    enum: ['in_stock', 'sold', 'returned'],            // Current status of item
    default: 'in_stock'
  }
}, { timestamps: true }); // Automatically includes createdAt and updatedAt fields

// Exports the Inventory model to be used in controllers
module.exports = mongoose.model('Inventory', InventorySchema);


