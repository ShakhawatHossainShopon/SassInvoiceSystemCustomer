
import User from "@/app/models/User";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectToDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User Not Exist" },
        { status: 400 }
      );
    }
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }
    const role = "User";
    const token = jwt.sign(
      { userId: user._id, shopId: user.shopId, role: role }, // Include userId and shopId in the payload
      secretKey
    );
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("userToken", token, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    console.error("Error in login handler:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
