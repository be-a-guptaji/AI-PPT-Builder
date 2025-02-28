import { Card, CardContent } from "@/components/ui/card";
import { Theme } from "@/lib/types";
import { motion, AnimationControls } from "framer-motion";
import Image from "next/image";
import React from "react";

type ThemeCardProps = {
    title: string;
    description: string;
    content: React.ReactNode;
    variant: "left" | "main" | "right";
    theme: Theme;
    controls: AnimationControls;
};

const ThemeCard = ({
    title,
    description,
    content,
    variant,
    theme,
    controls,
}: ThemeCardProps) => {
    const variants = {
        left: {
            hidden: { opacity: 0, x: "-50%", y: "-50%", scale: 0.9, rotate: 0 },
            visible: {
                opacity: 1,
                x: "-25%",
                y: "-25%",
                scale: 0.95,
                rotate: -10,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                },
            },
        },
        main: {
            hidden: { opacity: 0, scale: 0.9 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    delay: 0.2,
                },
            },
        },
        right: {
            hidden: { opacity: 0, x: "50%", y: "50%", scale: 0.9, rotate: 0 },
            visible: {
                opacity: 1,
                x: "25%",
                y: "25%",
                scale: 0.95,
                rotate: 10,
                transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.1,
                },
            },
        },
    };

    return (
        <motion.div
            initial={"hidden"}
            animate={controls}
            variants={variants[variant]}
            className="absolute w-full max-w-2xl"
            style={{ zIndex: variant === "main" ? 10 : 0 }}
        >
            <Card
                className="h-full shadow-2xl backdrop-blur-sm"
                style={{
                    backgroundColor: theme.slideBackgroundColor,
                    border: `1px solid ${theme.accentColor}20`,
                }}
            >
                <div className="flex flex-col md:flex-row">
                    <CardContent className="flex-1 p-8 space-y-6 md:w-1/2">
                        <div className="space-y-3">
                            <h2
                                className="text-3xl font-bold tracking-tight"
                                style={{ color: theme.accentColor }}
                            >
                                {title}
                            </h2>
                            <p
                                className="text-lg"
                                style={{ color: `${theme.accentColor}90` }}
                            >
                                {description}
                            </p>
                        </div>
                        {content}
                    </CardContent>
                    <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden rounded-r-lg">
                        <Image
                            src="https://plus.unsplash.com/premium_photo-1729004379397-ece899804701?q=80&w=2767&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Theme Preview Image"
                            layout="fill"
                            className="transition-transform duration-500 hover:scale-110 object-cover"
                        />
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default ThemeCard;
