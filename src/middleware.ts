import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define which routes are public and should not be protected
const isPublicRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/callback(.*)",
    "/api/webhook(.*)",
])

export default clerkMiddleware(async (auth, req): Promise<void> => {
    // Protect all routes except the public ones
    if (!isPublicRoute(req)) {
        await auth.protect() // Protect the route if it's not public
    }
})

// Config to match routes for middleware application
export const config = {
    matcher: [
        // Match all routes except Next.js internals and static files
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always apply middleware for API routes
        "/(api|trpc)(.*)",
    ],
}
