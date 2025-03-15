import User from "@/app/models/User";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Secret key for JWT token (this should ideally be in an environment variable)
const secretKey = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { items, total } = await req.json();
    console.log("Data", items, total);
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
    console.log(shopId);

    return NextResponse.json({ message: "Get Data Success" });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
