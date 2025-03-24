import { updateTheme } from "@/actions/projects";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { themes } from "@/lib/constant";
import { Theme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const ThemeChooser = () => {
  const [debouncedValue, setDebouncedValue] = useState<boolean>(false);
  const [value, setValue] = useState<Theme | null>(null);
  const { setTheme } = useTheme();
  const { currentTheme, project, setCurrentTheme } = useSlideStore();

  const handleThemeChange = useCallback(
    async (theme: Theme) => {
      if (!project) {
        toast.error("Error", {
          description: "Please select a project first",
        });
        return;
      }

      setTheme(theme.type);

      try {
        const res = await updateTheme(project.id, theme.name);

        if (res.status !== 200) {
          toast.error("Error", {
            description: "Failed to update theme",
          });
          return;
        }

        toast.success("Success", {
          description: "Theme updated successfully",
        });
      } catch (error) {
        console.error(error);
        toast.error("Error", {
          description: "Failed to update theme",
        });
      }
    },
    [project, setTheme]
  );

  useEffect(() => {
    if (value) {
      setCurrentTheme(value);
    }

    const handler = setTimeout(() => {
      setDebouncedValue(false);
      if (value) {
        handleThemeChange(value);
      }
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debouncedValue, setCurrentTheme, handleThemeChange]);

  return (
    <ScrollArea className="h-[400px] rounded-2xl">
      <div className="text-center font-bold my-4 mt-2">Themes</div>
      <div className="flex flex-col space-y-4 items-center my-4">
        {themes.map((theme, index) => (
          <Button
            key={theme.name || index}
            variant={theme.name === currentTheme.name ? "default" : "outline"}
            className={cn(
              "flex flex-col items-center justify-start px-4 w-11/12 h-auto cursor-pointer",
              theme.name === currentTheme.name && "border-kraton"
            )}
            style={{
              fontFamily: theme.fontFamily,
              background: theme.gradientBackground || theme.backgroundColor,
              color: theme.fontColor,
            }}
            onClick={() => {
              if (theme.name !== currentTheme.name) {
                setDebouncedValue(true);
                setValue(theme);
              } else {
                toast.error("Error", {
                  description: "Theme already selected",
                });
              }
            }}
          >
            <div className="w-full flex items-center justify-between">
              <span className="text-xl font-bold">{theme.name}</span>
              <div
                className="size-3 rounded-full"
                style={{ backgroundColor: theme.accentColor }}
              />
            </div>
            <div className="space-y-1 w-full">
              <div
                className="text-2xl font-bold"
                style={{ color: theme.accentColor }}
              >
                Title
              </div>
              <div className="text-base opacity-80">
                Body & <span style={{ color: theme.accentColor }}>link</span>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ThemeChooser;
