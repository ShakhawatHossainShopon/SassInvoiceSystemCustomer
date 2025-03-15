import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
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
        const store = await Store.findOne({ shopId });
        const res = {
            shopContact: store.shopContact,
            shopName: store.shopName,
            shopOwnerName: store.shopOwnerName,
            shopAddress: store.shopAddress,
            shopImage: store.shopImage
        }
        return NextResponse.json({ res });
    } catch (error) {
        // Handle any errors
        return NextResponse.json(
            { error: `Failed to fetch Store: ${error}` },
            { status: 500 }
        );
    }
}

