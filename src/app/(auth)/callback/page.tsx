import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"

const AuthCallBackPage = async () => {
    const auth = await onAuthenticateUser()

    // Handle the response and redirect accordingly
    if (auth.status === 200 || auth.status === 201) {
        // Redirect to the dashboard if authentication is successful
        redirect("/dashboard")
    }

    redirect("/sign-in")
}

export default AuthCallBackPage
