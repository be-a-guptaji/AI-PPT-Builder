import crypto from "node:crypto";
import client from "@/lib/prisma";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const body = JSON.parse(rawBody);
    const { buyUserID } = body.meta.custom_data;

    if (!buyUserID) {
      throw new Error("Invalid buyUserID or Id does not exist");
    }

    // Create the HMAC from the raw body using the secret key
    const hmac = crypto.createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRTE!
    );

    // Generate the digest as a hexadecimal string (no need to convert to Buffer yet)
    const digest = hmac.update(rawBody).digest("hex");

    // Get the signature from the header and ensure it is a string (hex format)
    const signature = req.headers.get("X-Signature") || "";

    // Ensure the signature has a valid value before comparing
    if (!signature) {
      throw new Error("Signature header is missing");
    }

    // Now, compare the digest and the signature using timingSafeEqual
    // Both are now strings in hexadecimal format, so we can safely compare
    if (
      !crypto.timingSafeEqual(
        Buffer.from(digest, "hex"),
        Buffer.from(signature, "hex")
      )
    ) {
      throw new Error("Invalid Signature");
    }

    // Proceed to handle the buyer update
    const buyer = await client.user.update({
      where: {
        id: buyUserID,
      },
      data: {
        subscription: true,
      },
    });

    if (!buyer) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json({ data: buyer, status: 200 });
  } catch (error) {
    return Response.json({
      error: "Internal Server Error" + error,
      status: 500,
    });
  }
}
