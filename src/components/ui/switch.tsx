"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
    ref={ref}
  >
    <Sun
      className={cn(
        "absolute top-[10px] right-[12px] z-50 size-4 fill-black transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:fill-white data-[state=checked]:stroke-gray-600 data-[state=checked]:opacity-100 data-[state=unchecked]:fill-black data-[state=unchecked]:stroke-white data-[state=unchecked]:opacity-0"
      )}
    />
    <SwitchPrimitive.Thumb
      className={cn(
        "bg-background pointer-events-none block size-7 rounded-full ring-0 shadow-lg transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-[39px] data-[state=unchecked]:translate-x-0"
      )}
    />
    <Moon
      className={cn(
        "absolute top-[10px] left-[10px] z-50 size-4 fill-white stroke-gray-600 transition-opacity duration-300 ease-in-out",
        "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
      )}
    />
  </SwitchPrimitive.Root>
));

export default Switch;
