import User from "@/app/models/User";
import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
const secretKey = process.env.JWT_SECRET;
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDB(); // Connect to MongoDB
    if (!secretKey) {
      return NextResponse.json({ error: "Jwt Missing" }, { status: 403 });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
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

    // Step 6: Return the JWT token in the response
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("userToken", token, {
      httpOnly: true,
    });
    return res;
  } catch (error) {
    return NextResponse.json({ error: `eoror: ${error}` }, { status: 500 });
  }
}
