import { generateLayout } from "@/actions/chatGPT";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Theme } from "@/lib/types";
import { useSlideStore } from "@/store/useSlideStore";
import { Loader2, Wand2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type ThemePicekerProps = {
  selectedTheme: Theme;
  themes: Theme[];
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  onThemeSelect: (theme: Theme) => void;
};

const ThemePicker = ({
  selectedTheme,
  themes,
  isLoading,
  setLoading,
  onThemeSelect,
}: ThemePicekerProps) => {
  const router = useRouter();
  const params = useParams();
  const { project, currentTheme, setSlides } = useSlideStore();

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
        currentTheme.name
      );

      if (response.status !== 200 || !response?.data) {
        toast.error("Oops!", {
          description: response.error || "Something went wrong",
        });
        return;
      }

      toast.success("Layouts generated successfully.", {
        description: "Redirecting to your presentation.",
      });

      router.push(`/presentation/${project?.id}`);

      setSlides(response.data);
    } catch (error) {
      console.error("Error generating layouts:", error);

      toast.error("Error!", {
        description: "Failed to generate layouts.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="sticky top-0 flex h-screen w-[400px] flex-col overflow-x-hidden"
      style={{
        backgroundColor:
          selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderLeft: `1px solid ${selectedTheme.accentColor}20`,
      }}
    >
      <div className="flex-shrink-0 space-y-6 p-8">
        <div className="space-y-2">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{
              color: selectedTheme.accentColor,
              fontFamily: selectedTheme.fontFamily,
            }}
          >
            Pick a Theme
          </h2>
          <p
            className="text-sm"
            style={{
              color: `${selectedTheme.accentColor}80`,
              fontFamily: selectedTheme.fontFamily,
            }}
          >
            Choose from our curated collection or generate your own custom theme
          </p>
        </div>
        <Button
          className="trasnsition-all h-12 w-full cursor-pointer text-lg font-medium shadow-lg duration-500 hover:shadow-xl"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
            fontFamily: selectedTheme.fontFamily,
          }}
          onClick={handleGenerateLayouts}
        >
          {isLoading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
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
      <ScrollArea className="flex flex-grow px-8 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {themes.map((theme) => (
            <motion.div
              key={theme.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="flex h-auto w-full flex-col items-center justify-start p-6"
                style={{
                  fontFamily: theme.fontFamily,
                  color: theme.fontColor,
                  background: theme.gradientBackground || theme.backgroundColor,
                }}
                onClick={() => onThemeSelect(theme)}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xl font-bold">{theme.name}</span>
                  <div
                    className="size-3 rounded-full"
                    style={{
                      backgroundColor: theme.accentColor,
                    }}
                  />
                </div>
                <div className="w-full space-y-1">
                  <div
                    className="text-2xl font-bold"
                    style={{ color: theme.accentColor }}
                  >
                    Title
                  </div>
                  <div className="text-base opacity-80">
                    Body &{" "}
                    <span style={{ color: theme.accentColor }}>Link</span>
                  </div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ThemePicker;
