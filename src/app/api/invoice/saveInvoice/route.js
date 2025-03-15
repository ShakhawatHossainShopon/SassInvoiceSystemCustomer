import Store from "@/app/models/Store";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT token (this should ideally be in an environment variable)
const secretKey = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { items, total } = await req.json();
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
    await connectToDB()

    const shop = await Store.findOne({ shopId });

    if (!shop) {
      return new Response(JSON.stringify({ error: 'Shop not found' }), {
        status: 404,
      });
    }
    const permission = shop.permission

    if (!permission) {
      return NextResponse.json({ error: "Please pay bill to add invoice" }, { status: 403 })
    }

    const invoiceId = `INV-${Date.now()}`;
    const date = new Date().toISOString();
    const newInvoice = {
      invoiceId,
      date,
      amount: total,
      items,
    };

    shop.invoices.push(newInvoice);
    shop.invoiceCount += 1;

    await shop.save();
    // Get the most recent invoice
    const latestInvoice = shop.invoices[shop.invoices.length - 1];

    return NextResponse.json({
      message: "Invoice added successfully",
      latestInvoice,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Failed Save Invoice" }, { status: 500 });
  }
}
