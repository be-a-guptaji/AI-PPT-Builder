"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ThemeCard from "./themeCard";
import ThemePicker from "./themePicker";
import { themes } from "@/lib/constant";
import { Theme } from "@/lib/types";

const ThemePreview = () => {
    const params = useParams();
    const router = useRouter();
    const controls = useAnimation();
    const { curretntTheme, project, setCurrentTheme } = useSlideStore();
    const [selectedTheme, setSelectedTheme] = useState(curretntTheme);

    useEffect(() => {
        if (project?.slides) {
            redirect(`/presentation/${params.presentationID}`);
        }
    }, [project, params.presentationID]);

    useEffect(() => {
        controls.start("visible");
    }, [controls, selectedTheme]);

    const applyTheme = (theme: Theme) => {
        setSelectedTheme(theme);
        setCurrentTheme(theme);
    };

    const leftCardContent = (
        <div className="space-y-4">
            <div
                className="rounded-xl p-6"
                style={{ backgroundColor: selectedTheme.accentColor + "10" }}
            >
                <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: selectedTheme.accentColor }}
                >
                    Quick Start Guide
                </h3>
                <ol
                    className="list-decimal list-inside space-y-2"
                    style={{ color: selectedTheme.accentColor }}
                >
                    <li>Choose a theme</li>
                    <li>Customize color and fonts</li>
                    <li>Add your content</li>
                    <li>Preview and publish</li>
                </ol>
            </div>
            <Button
                className="w-full h-12 text-lg font-medium cursor-pointer"
                style={{
                    backgroundColor: selectedTheme.accentColor,
                    color: selectedTheme.fontColor,
                }}
            >
                Get Started
            </Button>
        </div>
    );

    const mainCardContent = (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                    className="rounded-xl p-6"
                    style={{
                        backgroundColor: selectedTheme.accentColor + "10",
                    }}
                >
                    <p style={{ color: selectedTheme.accentColor }}>
                        This is a smart layout : it act as a text box.
                    </p>
                </div>
                <div
                    className="rounded-xl p-6"
                    style={{
                        backgroundColor: selectedTheme.accentColor + "10",
                    }}
                >
                    <p style={{ color: selectedTheme.accentColor }}>
                        You can get this by typing /smart.
                    </p>
                </div>
            </div>
            <div className="flex md:flex-wrap gap-4">
                <Button
                    className="px-6 h-12 text-lg font-medium cursor-pointer w-full"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    Primary Button
                </Button>
                <Button
                    className="px-6 h-12 text-lg font-medium cursor-pointer w-full"
                    style={{
                        backgroundColor: selectedTheme.backgroundColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    Secondary Button
                </Button>
            </div>
        </div>
    );

    const rightCardContent = (
        <div className="space-y-4">
            <div
                className="rounded-xl p-6"
                style={{ backgroundColor: selectedTheme.accentColor + "10" }}
            >
                <h3
                    className="text-xl font-semibold mb-4"
                    style={{ color: selectedTheme.accentColor }}
                >
                    Theme Features
                </h3>
                <ul
                    className="list-disc list-inside space-y-2"
                    style={{ color: selectedTheme.accentColor }}
                >
                    <li>Responsive design</li>
                    <li>Dark and light mode</li>
                    <li>Custom color schemes</li>
                    <li>Accessibility optimized</li>
                </ul>
            </div>
            <Button
                variant={"outline"}
                className="w-full h-12 text-lg font-medium cursor-pointer"
                style={{
                    backgroundColor: selectedTheme.backgroundColor,
                    color: selectedTheme.fontColor,
                }}
            >
                Explore Features
            </Button>
        </div>
    );

    return (
        <div
            className="h-screen w-full flex"
            style={{
                backgroundColor: selectedTheme.backgroundColor,
                color: selectedTheme.accentColor,
                font: selectedTheme.fontFamily,
            }}
        >
            <div className="flex-grow overflow-y-auto">
                <div className="p-12 flex flex-col items-center min-h-screen">
                    <Button
                        variant={"outline"}
                        className="mb-12 self-start"
                        size={"lg"}
                        style={{
                            backgroundColor: selectedTheme.accentColor + "10",
                            color: selectedTheme.accentColor,
                            font: selectedTheme.accentColor + "20",
                        }}
                        onClick={() => router.push("/create-page")}
                    >
                        <ArrowLeft className="mr-2 size-5" />
                        Back
                    </Button>
                    <div className="w-full flex justify-center items-center relative flex-grow">
                        <ThemeCard
                            title="Quick Start"
                            description="Get up and running in no time"
                            content={leftCardContent}
                            variant="left"
                            theme={selectedTheme}
                            controls={controls}
                        />
                        <ThemeCard
                            title="Main Content"
                            description="Add your main content"
                            content={mainCardContent}
                            variant="main"
                            theme={selectedTheme}
                            controls={controls}
                        />
                        <ThemeCard
                            title="Theme Features"
                            description="Explore our theme features"
                            content={rightCardContent}
                            variant="right"
                            theme={selectedTheme}
                            controls={controls}
                        />
                    </div>
                </div>
            </div>
            <ThemePicker
                selectedTheme={selectedTheme}
                themes={themes}
                onThemeSelect={applyTheme}
            />
        </div>
    );
};

export default ThemePreview;
