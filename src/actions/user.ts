"use server"

import { client } from "@/lib/prisma"
import { ReturnProps } from "@/lib/types"
import { currentUser } from "@clerk/nextjs/server"
import { User } from "@prisma/client"

type UserReturnProps = ReturnProps & {
    user?: User
}

export const onAuthenticateUser = async (): Promise<UserReturnProps> => {
    try {
        const user = await currentUser()

        if (!user) {
            return { status: 403 }
        }

        // Check if the user already exists in the database
        const userExists = await client.user.findUnique({
            where: {
                clerkId: user.id,
            },
            include: {
                PurchasedProjects: {
                    select: {
                        id: true,
                    },
                },
            },
        })

        if (userExists) {
            return {
                status: 200,
                user: userExists,
            }
        }

        // If the user doesn't exist, create a new user
        const newUser = await client.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.firstName + " " + user.lastName,
                profileImage: user.imageUrl,
            },
        })

        if (newUser) {
            return { status: 201, user: newUser }
        }

        return { status: 400, error: "Something went wrong" }
    } catch (error) {
        return { status: 500, error: "Internal server error" + error }
    }
}

export const updateUser = async (
    lemonSqueezyAPIKey: string,
    storeID: string,
    webhookSecret: string
): Promise<UserReturnProps> => {
    try {
        const checkUser = await onAuthenticateUser()

        if (checkUser.status !== 200 || !checkUser.user) {
            return {
                status: 403,
                error: "User not Authenticated",
            }
        }

        const updatedUser = await client.user.update({
            where: {
                id: checkUser.user.id,
            },
            data: {
                lemonSqueezyAPIKey,
                storeID,
                webhookSecret,
            },
        })

        if (!updatedUser) {
            return {
                status: 400,
                error: "Something went wrong",
            }
        }

        return {
            status: 200,
            user: updatedUser,
        }
    } catch (error) {
        return {
            status: 500,
            error: "Internal Server Error" + error,
        }
    }
}
