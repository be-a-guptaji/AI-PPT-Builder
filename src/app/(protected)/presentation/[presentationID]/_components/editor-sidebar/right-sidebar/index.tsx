"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useSlideStore } from "@/store/useSlideStore";
import { PopoverContent } from "@radix-ui/react-popover";
import { LayoutTemplate, Palette, Type } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import LayoutChooser from "./tabs/layoutChooser";
import { cn } from "@/lib/utils";
import { component } from "@/lib/constant";
import ComponentCard from "./tabs/components-tabs/componentPreview";
import ThemeChooser from "./tabs/themeChooser";
import { ScrollArea } from "@/components/ui/scroll-area";

const EditorSidebar = () => {
  const popOverRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { currentTheme } = useSlideStore();

  const layoutButton = document.getElementById("layout");
  const styleButton = document.getElementById("style");
  const themeButton = document.getElementById("theme");

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const state = target.getAttribute("data-state");

    if (state === "open") {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (popOverRef.current && !popOverRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
    if (
      layoutButton?.getAttribute("data-state") === "closed" &&
      styleButton?.getAttribute("data-state") === "closed" &&
      themeButton?.getAttribute("data-state") === "closed"
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <div className="fixed top-1/2 right-2 z-10 -translate-y-1/2 transform">
      <div
        className={cn(
          "border-background/30 flex flex-col items-center space-y-4 rounded-xl border border-r-0 p-2 opacity-65 shadow-lg transition-opacity duration-300 hover:opacity-100",
          open && "opacity-100 ring-2 ring-blue-500"
        )}
        ref={popOverRef}
      >
        <Popover>
          <PopoverTrigger asChild id="layout">
            <Button
              variant="ghost"
              size={"icon"}
              className="m-0 size-10 cursor-pointer rounded-full"
              onClick={(e) => {
                handleOpen(e);
              }}
            >
              <LayoutTemplate className="size-5" />
              <span className="sr-only">Choose Layout</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="relative right-6 w-[480px] rounded-2xl border-1 p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <LayoutChooser />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild id="style">
            <Button
              variant="ghost"
              size={"icon"}
              className="m-0 size-10 cursor-pointer rounded-full"
              onClick={(e) => {
                handleOpen(e);
              }}
            >
              <Type className="size-5" />
              <span className="sr-only">Choose Style</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="relative right-6 w-[480px] rounded-2xl border-1 p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <ScrollArea className="h-[400px]">
              <div className="flex flex-col space-y-6 p-4">
                {component.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-muted-foreground px-1 text-sm font-medium">
                      {group.name}
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {group.components.map((item, index) => (
                        <ComponentCard key={index} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild id="theme">
            <Button
              variant="ghost"
              size={"icon"}
              className="m-0 size-10 cursor-pointer rounded-full"
              onClick={(e) => {
                handleOpen(e);
              }}
            >
              <Palette className="size-5" />
              <span className="sr-only">Change Theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="left"
            align="center"
            className="relative right-6 w-80 rounded-2xl border-1 p-0"
            style={{
              backgroundColor: currentTheme.backgroundColor,
              color: currentTheme.fontColor,
            }}
          >
            <ThemeChooser />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default EditorSidebar;
