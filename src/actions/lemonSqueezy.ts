"use server"

import { ReturnProps } from "@/lib/types"
import lemonSqueezyClient from "@/lib/axios"
import axios from "axios" // Import axios for error handling

export const buySubscription = async (
    buyUserID: string
): Promise<ReturnProps> => {
    try {
        // Verify if environment variables are set
        if (
            !process.env.LEMON_SQUEEZY_API_KEY ||
            !process.env.LEMON_SQUEEZY_STORE_ID ||
            !process.env.LEMON_SQUEEZY_VARIANT_ID
        ) {
            throw new Error(
                "Missing environment variables: Ensure LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, and LEMON_SQUEEZY_VARIANT_ID are set."
            )
        }

        const res = await lemonSqueezyClient(
            process.env.LEMON_SQUEEZY_API_KEY
        ).post("/checkouts", {
            data: {
                type: "checkouts",
                attributes: {
                    checkout_data: {
                        custom: {
                            buyUserID: buyUserID, // Ensure that `buyUserID` is valid
                        },
                    },
                    product_options: {
                        redirect_url: `${process.env.NEXT_PUBLIC_HOST_URL}/dashboard`, // Ensure redirect URL is valid
                    },
                },
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: process.env.LEMON_SQUEEZY_STORE_ID, // Ensure this is a valid store ID
                        },
                    },
                    variant: {
                        data: {
                            type: "variants",
                            id: process.env.LEMON_SQUEEZY_VARIANT_ID, // Ensure this is a valid variant ID
                        },
                    },
                },
            },
        })

        // Extract the checkout URL from the response
        const checkoutURL = res.data.data.attributes.url

        return {
            status: 200,
            data: checkoutURL,
        }
    } catch (error) {
        // Check if the error is an AxiosError and log the detailed error response
        if (axios.isAxiosError(error)) {
            // Check for validation errors or other specific errors in the response
            if (error.response?.data?.errors) {
                return {
                    status: 422, // Specific status code for validation errors
                    error:
                        error.response?.data.errors[0]?.detail ||
                        "Validation error",
                }
            } else {
                return {
                    status: error.response?.status || 500,
                    error:
                        error.response?.data?.message ||
                        "Request failed with an unknown error",
                }
            }
        } else {
            return {
                status: 500,
                error:
                    "Internal Server Error: " +
                    (error instanceof Error ? error.message : String(error)),
            }
        }
    }
}
