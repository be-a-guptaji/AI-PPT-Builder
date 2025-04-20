import { FlaskConicalOffIcon } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-12">
      <FlaskConicalOffIcon className="size-48" />
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-primary text-3xl font-semibold">
          Nothing to see here
        </p>
        <p className="text-secondary-foreground/50 text-base font-normal">
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
