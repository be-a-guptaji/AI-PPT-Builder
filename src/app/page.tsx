"use client"

import { ArrowUp } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    const fadeIn = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8 },
    }

    const slideUp = {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, delay: 0.2 },
    }

    const slideDown = {
        initial: { y: -50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, delay: 0.2 },
    }

    return (
        <motion.div
            className="h-screen w-screen flex flex-col justify-center items-center cursor-default gap-10 bg-gradient-to-br from-indigo-100 via-purple-300 via-pink-300 to-yellow-400"
            {...fadeIn}
        >
            <motion.div
                className="text-9xl font-bold text-kraton drop-shadow-lg tracking-widest"
                {...slideDown}
            >
                Kraton
            </motion.div>
            <motion.div
                className="text-center text-lg text-gray-700 max-w-xl font-semibold"
                {...slideUp}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                An AI-powered online PPT builder that automatically designs
                stunning presentations based on your content, saving you time
                and effort.
            </motion.div>
            <motion.div
                {...slideUp}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="hover:scale-105 flex justify-between items-center transition-all duration-300 group hover:shadow-lg"
            >
                <Button
                    className="cursor-pointer size-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 shadow-md text-2xl transition-colors duration-300"
                    aria-label="Start using Kraton"
                    onClick={() => router.push("/dashboard")}
                >
                    Let&apos;s go{" "}
                    <ArrowUp className="ml-2 group-hover:animate-bounce transition-transform duration-300 rotate-90" />
                </Button>
            </motion.div>
        </motion.div>
    )
}
