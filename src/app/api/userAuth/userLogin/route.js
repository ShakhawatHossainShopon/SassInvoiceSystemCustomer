
import { connectToDB } from "@/lib/mongodb";

import { NextResponse } from "next/server";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Parse request body
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }
    // Connect to MongoDB
    const db = await connectToDB();

    if (!db) {
      return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
    }
    // Find the user in the database
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }


    return NextResponse.json({ message: "MongoDB connected successfully!" });
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
