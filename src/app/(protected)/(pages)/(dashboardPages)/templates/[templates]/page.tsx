"use client"

import PresentationMode from "@/app/(protected)/presentation/[presentationID]/_components/navbar/presentationMode"
import { useRouter } from "next/navigation"
import React from "react"

const Page = () => {
    const router = useRouter()

    return (
        <PresentationMode
            onClose={() => {
                router.push("/templates")
            }}
        />
    )
}

export default Page
