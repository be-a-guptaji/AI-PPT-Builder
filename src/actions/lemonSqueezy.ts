import lemonSqueezyClient from "@/lib/axios"
import { ReturnProps } from "@/lib/types"

export const buySubscription = async (
    buyUserID: string
): Promise<ReturnProps> => {
    try {
        const res = await lemonSqueezyClient(
            process.env.LEMON_SQUEEZY_API_KEY
        ).post("/checkouts", {
            data: {
                type: "checkouts",
                attributes: {
                    checkout_data: {
                        custom: {
                            buyUserID: buyUserID,
                        },
                    },
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST}/dashboard`,
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: process.env.LEMON_SQUEEZY_STORE_ID,
                        },
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: process.env.LEMON_SQUEEZY_VARIANT_ID,
                        },
                    },
                },
            },
        })

        const checkoutURL = res.data.data.attributes.url

        return {
            status: 200,
            data: checkoutURL,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}
