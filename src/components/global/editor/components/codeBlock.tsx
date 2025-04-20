import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import React from "react";

type CodeBlockProps = {
  code?: string;
  language?: string;
  className?: string;
  onChange: (newCode: string) => void;
};

const CodeBlock = ({ className, code, language, onChange }: CodeBlockProps) => {
  const { currentTheme } = useSlideStore();

  return (
    <pre
      className={cn("overflow-x-auto rounded-lg p-4", className)}
      style={{ backgroundColor: currentTheme.accentColor + "20" }}
    >
      <code className={`language-${language}`}>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="size-full bg-transparent font-mono outline-none"
          style={{ color: currentTheme.fontColor }}
        />
      </code>
    </pre>
  );
};

export default CodeBlock;
