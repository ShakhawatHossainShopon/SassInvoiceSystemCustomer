import { connectToDB } from "@/lib/mongodb";
import Store from "@/app/models/Store";
import User from "@/app/models/User";
import { v4 as uuidv4 } from "uuid";

export async function POST(req, res) {
  try {
    const {
      email,
      password,
      username,
      shopName,
      shopOwnerName,
      shopContact,
      shopImage,
    } = req.body;

    // Ensure that Cloudinary URL is provided for the image
    if (!shopImage) {
      return res.status(400).json({ error: "Shop image is required" });
    }

    // Create a new user
    const userId = uuidv4();
    const NewUser = new User({
      email,
      password,
      username,
      shopId: userId,
      role: "User",
    });

    // Create a new shop with the image URL
    const NewShop = new Store({
      email,
      username,
      shopName,
      shopOwnerName,
      shopImage,
      shopContact,
      shopId: userId,
      invoices: [],
      invoiceCount: 0,
    });

    // Save user and shop to MongoDB
    await NewUser.save();
    await NewShop.save();

    return res
      .status(200)
      .json({ success: "Shop and user created successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Failed to register shop: ${error.message}` });
  }
}
