"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const ThemePreview = () => {
    const params = useParams();
    const router = useRouter();
    const controls = useAnimation();
    const { curretntTheme, project } = useSlideStore();
    const [selectedTheme, setSelectedTheme] = useState(curretntTheme);

    useEffect(() => {
        if (project?.slides) {
            redirect(`/presentation/${params.presentationID}`);
        }
    }, [project, params.presentationID]);

    useEffect(() => {
        controls.start("visible");
    }, [controls, selectedTheme]);

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
                className="w-full h-12 text-lg font-medium"
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
            <div className="flex flex-wrap gap-4">
                <Button
                    className="px-6 h-12 text-lg font-medium"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    Primary Button
                </Button>
                <Button
                    className="px-6 h-12 text-lg font-medium"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.fontColor,
                    }}
                >
                    Secondary Button
                </Button>
            </div>
        </div>
    );

    const rightCardContent = <div className="space-y-4"></div>;
};

export default ThemePreview;
