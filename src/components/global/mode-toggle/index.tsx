"use client";

import Switch from "@/components/ui/switch";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

const TheamSwicher = () => {
  const [mouted, setMouted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMouted(true);
  }, []);

  if (!mouted) {
    return null;
  }

  return (
    <div>
      <Switch
        checked={theme === "dark"}
        className="data-[state=checked]:bg-primary/20 h-10 w-20 pl-1"
        aria-label="Toggle dark mode"
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
    </div>
  );
};

export default TheamSwicher;
