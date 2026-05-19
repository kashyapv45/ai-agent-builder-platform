import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    tokenBucket({
      mode: "LIVE",
      characteristics: ["userId"], // Track by Clerk User ID
      refillRate: 100,             // Dummy value; we'll override this logic
      interval: "30d",             // Monthly reset
      capacity: 100,               // Default for Free
    }),
  ],
});