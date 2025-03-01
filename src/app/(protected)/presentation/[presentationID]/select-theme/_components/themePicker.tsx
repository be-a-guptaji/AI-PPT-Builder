import { generateLayout } from "@/actions/chatGPT";
import { Button } from "@/components/ui/button";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type ThemePicekerProps = {
    selectedTheme: Theme;
    themes: Theme[];
    onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({
    selectedTheme,
    themes,
    onThemeSelect,
}: ThemePicekerProps) => {
    const router = useRouter();
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const { project, curretntTheme, setSlides } = useSlideStore();

    const handleGenerateLayouts = async () => {
        setLoading(true);

        if (!selectedTheme) {
            toast.error("No Theme", {
                description: "Please select a theme.",
            });
            return;
        }

        if (project?.id === "") {
            toast.error("Project not found", {
                description: "Please create a project first.",
            });
            router.push("/create-page");
            return;
        }

        try {
            const response = await generateLayout(
                params.presentationID as string,
                curretntTheme.name
            );

            if (response.status !== 200 || !response?.data) {
                toast.error("Oops!", {
                    description: response.error || "Something went wrong",
                });
                return;
            }
        } catch (error) {
            console.error("Error generating layouts:", error);
        }
    };

    return (
        <div
            className="w-[400px] overflow-hidden sticky top-0 h-screen flex flex-col"
            style={{
                backgroundColor:
                    selectedTheme.sidebarColor || selectedTheme.backgroundColor,
                borderLeft: `1px solid ${selectedTheme.accentColor}20`,
            }}
        >
            <div className="p-8 space-y-6 flex-shrink-0">
                <div className="space-y-2">
                    <h2
                        className="text-3xl font-bold tracking-tight"
                        style={{ color: selectedTheme.accentColor }}
                    >
                        Pick a Theme
                    </h2>
                    <p
                        className="text-sm"
                        style={{ color: `${selectedTheme.accentColor}80` }}
                    >
                        Choose from our curated collection or generate your own
                        custom theme
                    </p>
                </div>
                <Button
                    className="w-full h-12 text-lg cursor-pointer font-medium shadow-lg hover:shadow-xl trasnsition-all duration-500"
                    style={{
                        backgroundColor: selectedTheme.accentColor,
                        color: selectedTheme.backgroundColor,
                    }}
                    onClick={handleGenerateLayouts}
                >
                    {isLoading ? (
                        <Loader2 className="mr-2 animate-spin size-4" />
                    ) : (
                        <Wand2 className="mr-2 size-4" />
                    )}
                    {isLoading ? (
                        <p className="animate-pulse">Generating...</p>
                    ) : (
                        "Generate Theme"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default ThemePicker;
