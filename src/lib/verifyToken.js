import jwt from "jsonwebtoken"; // JWT library to decode tokens

// Helper function to verify and extract the shopId from the JWT token
export function verifyToken(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with your secret key
    return decoded.shopId; // Assuming the token contains `shopId`
  } catch (error) {
    throw new Error("Invalid token");
  }
}
