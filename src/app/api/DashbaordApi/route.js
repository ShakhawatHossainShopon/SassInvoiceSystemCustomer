import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Store from "@/app/models/Store";

// Secret key for JWT token (this should ideally be in an environment variable)
const secretKey = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    const token = req.cookies.get("userToken"); // Correct usage of req.cookies
    if (!token) {
      return new Response(
        JSON.stringify({ error: "Token is missing in cookies" }),
        {
          status: 400,
        }
      );
    }
    const { value } = token;
    const decoded = jwt.verify(value, secretKey);
    const { shopId } = decoded;
    if (!shopId) {
      return new Response(
        JSON.stringify({ error: "Shop ID is missing in token" }),
        {
          status: 400,
        }
      );
    }

    const shop = await Store.findOne({ shopId }); // Find a single shop by shopId
    if (!shop) {
      return new Response(JSON.stringify({ error: "Shop not found" }), {
        status: 404,
      });
    }

    let totalInvoiceCount = 0;
    let totalAmount = 0;
    let totalItems = 0;

    // Loop through the invoices and calculate totals
    totalInvoiceCount = shop.invoices.length;
    shop.invoices.forEach((invoice) => {
      totalAmount += invoice.amount;
      invoice.items.forEach((item) => {
        totalItems += item.quantity;
      });
    });

    // Send the response using NextResponse
    return NextResponse.json({
      totalInvoiceCount,
      totalAmount,
      totalItems,
    });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { error: `Failed to fetch Store: ${error.message}` },
      { status: 500 }
    );
  }
}
