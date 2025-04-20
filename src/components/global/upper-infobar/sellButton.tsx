"use client";

import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import React from "react";

const SellButton = () => {
  return (
    <Button
      className="bg-primary/20 text-primary cursor-pointer rounded-lg font-semibold transition-all duration-300 hover:bg-black/30 dark:hover:bg-white/30"
      size={"default"}
      onClick={() => {
        navigator.clipboard.writeText(
          `${NEXT_PUBLIC_HOST_URL}/share/${shareID}`
        );
      }}
    >
      <Forward className="size-4" />
      Sell Template
    </Button>
  );
};

export default SellButton;
