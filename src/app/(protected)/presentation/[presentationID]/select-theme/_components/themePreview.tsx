"use client";

import { useSlideStore } from "@/store/useSlideStore";
import { redirect, useParams, useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import ThemeCard from "./themeCard";
import ThemePicker from "./themePicker";
import { themes } from "@/lib/constant";
import { Theme } from "@/lib/types";

const ThemePreview = () => {
  const params = useParams();
  const router = useRouter();
  const controls = useAnimation();
  const { currentTheme, project, setCurrentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);
  const [isLoading, setLoading] = useState(false);

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
          className="mb-4 text-xl font-semibold"
          style={{ color: selectedTheme.accentColor }}
        >
          Quick Start Guide
        </h3>
        <ol
          className="list-inside list-decimal space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize color and fonts</li>
          <li>Add your content</li>
          <li>Preview and publish</li>
        </ol>
      </div>
      <Button
        className="h-12 w-full cursor-pointer text-lg font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
          fontFamily: selectedTheme.fontFamily,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  const mainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
      <div className="flex gap-4 md:flex-wrap">
        <Button
          className="h-12 w-full cursor-pointer px-6 text-lg font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
            fontFamily: selectedTheme.fontFamily,
          }}
        >
          Primary Button
        </Button>
        <Button
          className="h-12 w-full cursor-pointer px-6 text-lg font-medium"
          style={{
            fontFamily: selectedTheme.fontFamily,
            color: selectedTheme.fontColor,
            background:
              selectedTheme.gradientBackground || selectedTheme.backgroundColor,
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
          className="mb-4 text-xl font-semibold"
          style={{ color: selectedTheme.accentColor }}
        >
          Theme Features
        </h3>
        <ul
          className="list-inside list-disc space-y-2"
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
        className="h-12 w-full cursor-pointer text-lg font-medium"
        style={{
          backgroundColor: selectedTheme.backgroundColor,
          color: selectedTheme.fontColor,
          fontFamily: selectedTheme.fontFamily,
        }}
      >
        Explore Features
      </Button>
    </div>
  );

  if (isLoading) {
    return (
      <>
        <div className="flex size-full h-screen flex-col items-center justify-center gap-6 text-black dark:text-white">
          <Loader2 className="size-8 animate-spin" />
          <p className="animate-pulse text-center text-xl font-semibold text-black dark:text-white">
            Get ready to witness a stunning experience!
          </p>
          <p className="animate-pulse text-center text-lg font-normal text-black dark:text-white">
            We&apos;re preparing something special just for you on{" "}
            <span className="text-kraton text-xl font-bold">
              {`${project?.title || "Your Selected Topic"}`}
            </span>
            .
          </p>
          <p className="animate-pulse text-center text-lg font-normal text-black dark:text-white">
            Sit back, relax, and let us handle the heavy lifting. We promise
            it&apos;ll be worth the wait!
          </p>
        </div>
      </>
    );
  }

  return (
    <div
      className="flex h-screen w-full"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        font: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="flex min-h-screen flex-col items-center p-12">
          <Button
            variant={"outline"}
            className="mb-12 cursor-pointer self-start"
            size={"lg"}
            style={{
              backgroundColor: selectedTheme.accentColor,
              color: selectedTheme.fontColor,
              fontFamily: selectedTheme.fontFamily,
            }}
            onClick={() => router.push("/create-page")}
          >
            <ArrowLeft className="mr-2 size-5" />
            Back
          </Button>
          <div className="relative flex w-full flex-grow items-center justify-center">
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
        isLoading={isLoading}
        setLoading={setLoading}
        onThemeSelect={applyTheme}
      />
    </div>
  );
};

export default ThemePreview;
