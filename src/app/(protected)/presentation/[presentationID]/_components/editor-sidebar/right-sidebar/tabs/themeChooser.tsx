import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { themes } from "@/lib/constant"
import { useSlideStore } from "@/store/useSlideStore"
import { useTheme } from "next-themes"
import React from "react"

const ThemeChooser = () => {
    const { currentTheme, project, setCurrentTheme } = useSlideStore()
    const { setTheme } = useTheme()

    return (
        <ScrollArea className="h-[400px] rounded-2xl">
            <div className="text-center font-bold my-4 mt-2">Themes</div>
            <div className="flex flex-col space-y-4">
                {themes.map((theme, index) => (
                    <Button
                        key={theme.name || index}
                        variant={
                            theme.name === currentTheme.name
                                ? "default"
                                : "outline"
                        }
                        className="flex flex-col items-center justify-start px-4 w-full h-auto"
                        style={{
                            fontFamily: theme.fontFamily,
                            backgroundColor:
                                theme.gradientBackground ||
                                theme.backgroundColor,
                            color: theme.fontColor,
                        }}
                        onClick={() => setCurrentTheme(theme)}
                    ></Button>
                ))}
            </div>
        </ScrollArea>
    )
}

export default ThemeChooser
