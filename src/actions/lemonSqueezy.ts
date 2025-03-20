import { ReturnProps } from "@/lib/types"

export const buySubscription = async (
    buyUserID: string
): Promise<ReturnProps> => {
    try {
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}
