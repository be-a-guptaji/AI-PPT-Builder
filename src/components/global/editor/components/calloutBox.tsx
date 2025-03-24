import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Info,
} from "lucide-react";
import React from "react";

type CalloutBoxProps = {
  type: "success" | "warning" | "info" | "question" | "caution";
  className?: string;
  children: React.ReactNode;
};

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
  caution: AlertCircle,
};

const CalloutBox = ({ children, type, className }: CalloutBoxProps) => {
  const Icon = icons[type];

  const colors = {
    success: {
      bg: "bg-green-100",
      border: "bg-green-500",
      text: "bg-green-700",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "bg-yellow-500",
      text: "bg-yellow-700",
    },
    info: {
      bg: "bg-blue-100",
      border: "bg-blue-500",
      text: "bg-blue-700",
    },
    question: {
      bg: "bg-purple-100",
      border: "bg-purple-500",
      text: "bg-purple-700",
    },
    caution: {
      bg: "bg-red-100",
      border: "bg-red-500",
      text: "bg-red-700",
    },
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 flex items-start",
        colors[type].bg,
        colors[type].border,
        colors[type].text,
        className
      )}
    >
      <Icon className="size-5 mr-3 mt-0.5" />
      <div>{children}</div>
    </div>
  );
};

export default CalloutBox;
