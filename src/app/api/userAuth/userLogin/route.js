import User from "@/app/models/User";
import { connectToDB } from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// Secret key for JWT token (this should ideally be in an environment variable)
const secretKey = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    // Check MongoDB connection status
    const connectionStatus = await connectToDB();

    // If connection is successful
    if (connectionStatus.success) {
      console.log(connectionStatus.message); // MongoDB is connected

      // Proceed with your login or other logic here
      return NextResponse.json({ message: "MongoDB connected successfully!" });
    } else {
      // If failed to connect
      return NextResponse.json({ error: connectionStatus.message }, { status: 403 });
    }
  } catch (erorr) {
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
