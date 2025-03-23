export const dynamic = "force-dynamic"

import crypto from "node:crypto"
import client from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text()
        const body = JSON.parse(rawBody)
        const { buyUserID } = body.meta.custom_data

        if (!buyUserID) {
            throw new Error("Invalid buyUserID or Id does not exist")
        }

        const hmac = crypto.createHmac(
            "sha256",
            process.env.LEMON_SQUEEZY_WEBHOOK_SECRTE!
        )

        const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8")

        const signature = Buffer.from(
            req.headers.get("X-Sigature") || "",
            "utf8"
        )

        if (!crypto.timingSafeEqual(digest, signature)) {
            throw new Error("Invalid Signature")
        }

        const buyer = await client.user.update({
            where: {
                id: buyUserID,
            },
            data: {
                subscription: true,
            },
        })

        if (!buyer) {
            return new Response("User not found", { status: 404 })
        }

        return Response.json({ data: buyer, status: 200 })
    } catch (error) {
        return Response.json({
            error: "Internal Server Error" + error,
            status: 500,
        })
    }
}
