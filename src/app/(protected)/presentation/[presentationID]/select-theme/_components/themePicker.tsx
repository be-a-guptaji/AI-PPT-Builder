import { Theme } from "@/lib/types";
import { useRouter } from "next/navigation";
import React from "react";

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

    return <div>ThemePicker</div>;
};

export default ThemePicker;
