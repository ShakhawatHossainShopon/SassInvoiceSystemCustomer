import { connectToDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectToDB(); // Connect to MongoDB

    return NextResponse.json({ message: "MongoDB connected successfully!" });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}
