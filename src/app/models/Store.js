import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid"; // Import uuid library

// Define the Invoice schema
const InvoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  items: [
    {
      description: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Define the Admin schema with an array of invoices
const ShopSchema = new mongoose.Schema({
  shopId: { type: String, default: uuidv4 }, // UUID field for the shop
  shopContact: {
    type: Number,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopOwnerName: {
    type: String,
    required: true,
  },
  shopAddress: {
    type: String,
    required: true,
  },
  shopImage: {
    type: String,
    required: true,
  },
  invoiceCount: {
    type: Number,
  },
  invoices: [InvoiceSchema], // Array of invoices
});

export default mongoose.models.Shop || mongoose.model("Shop", ShopSchema);
