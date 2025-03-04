import React, { Suspense } from "react"
import CreatePageSkeleton from "./_components/create-page/createPageSkeleton"
import RenderPage from "./_components/renderPage"
import { onAuthenticateUser } from "@/actions/user"
import { redirect } from "next/navigation"

const Page = async () => {
  const checkUser = await onAuthenticateUser()

  if (!checkUser?.user) {
    redirect("/sign-in")
  }

  if (!checkUser?.user?.subscription) {
    redirect("/dashboard")
  }

  return (
    <main className="w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage />
      </Suspense>
    </main>
  )
}

export default Page
