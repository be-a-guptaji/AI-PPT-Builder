import { FlaskConicalOffIcon } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-[70vh] w-full items-center justify-center gap-12">
      <FlaskConicalOffIcon className="size-48" />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-3xl font-semibold text-primary">
          Nothing to see here
        </p>
        <p className="text-base font-normal text-secondary-foreground/50">
          No such product existed create one with{" "}
          <span className="text-kraton font-bold tracking-wide">
            Creative AI
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
