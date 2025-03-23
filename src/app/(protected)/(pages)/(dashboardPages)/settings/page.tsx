import { onAuthenticateUser } from "@/actions/user"
import React from "react"
import UserSettings from "./_components/userSettings"

const Page = async () => {
    const checkUser = await onAuthenticateUser()

    return (
        <div className="flex flex-col gap-6 relative">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-semibold dark:text-primary backdrop-blur-lg">
                        Settings
                    </h1>
                    <p className="text-base font-normal dark:text-secondary-foreground/50">
                        All of your settings
                    </p>
                </div>
            </div>
            <UserSettings User={checkUser.user} />
        </div>
    )
}

export default Page
