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
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input relative",
            className
        )}
        {...props}
        ref={ref}
    >
        <Sun
            className={cn(
                "size-4 absolute z-50 top-[10px] right-[12px] transition-opacity fill-black duration-300 ease-in-out",
                "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0 data-[state=checked]:fill-white data-[state=unchecked]:fill-black data-[state=checked]:stroke-gray-600 data-[state=unchecked]:stroke-white"
            )}
        />
        <SwitchPrimitive.Thumb
            className={cn(
                "pointer-events-none block size-7 rounded-full bg-background shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-x-[39px] data-[state=unchecked]:translate-x-0"
            )}
        />
        <Moon
            className={cn(
                "size-4 absolute z-50 top-[10px] left-[10px] stroke-gray-600 fill-white transition-opacity duration-300 ease-in-out",
                "data-[state=checked]:opacity-100 data-[state=unchecked]:opacity-0"
            )}
        />
    </SwitchPrimitive.Root>
));

export default Switch;
