import { aj } from "@/config/arcjet";
import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userEmail = "user@example.com"; // Replace with your authenticated user email
  const decision = await aj.protect(req, { userId: userEmail, requested: 500 }); // Deduct 5 tokens from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: "Too Many Requests", reason: decision.reason },
      { status: 429 },
    );
  }

  return NextResponse.json({ message: "Hello world" });
}