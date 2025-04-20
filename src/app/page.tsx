"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 },
  };

  const slideUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, delay: 0.2 },
  };

  const slideDown = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, delay: 0.2 },
  };

  return (
    <motion.div
      className="flex h-screen w-screen cursor-default flex-col items-center justify-center gap-10 bg-gradient-to-br from-indigo-100 via-pink-300 via-purple-300 to-yellow-400"
      {...fadeIn}
    >
      <motion.div
        className="text-kraton text-9xl font-bold tracking-widest drop-shadow-lg"
        {...slideDown}
      >
        Kraton
      </motion.div>
      <motion.div
        className="max-w-xl text-center text-lg font-semibold text-gray-700"
        {...slideUp}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        An AI-powered online PPT builder that automatically designs stunning
        presentations based on your content, saving you time and effort.
      </motion.div>
      <motion.div
        {...slideUp}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="group flex items-center justify-between transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        <Button
          className="size-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 text-2xl text-white shadow-md transition-colors duration-300 hover:from-purple-600 hover:to-blue-500"
          aria-label="Start using Kraton"
          onClick={() => router.push("/dashboard")}
        >
          Let&apos;s go{" "}
          <ArrowUp className="ml-2 rotate-90 transition-transform duration-300 group-hover:animate-bounce" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
