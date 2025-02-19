import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function timeAgo(timeStamp: string) {
    const now = new Date();
    const differenceInSeconds = Math.floor(
        (now.getTime() - new Date(timeStamp).getTime()) / 1000
    );

    const intervals = [
        { label: "year", value: 60 * 60 * 24 * 365 }, // Year in seconds
        { label: "month", value: 60 * 60 * 24 * 30 }, // Month in seconds (approximation)
        { label: "week", value: 60 * 60 * 24 * 7 }, // Week in seconds
        { label: "day", value: 60 * 60 * 24 }, // Day in seconds
        { label: "hour", value: 60 * 60 }, // Hour in seconds
        { label: "minute", value: 60 }, // Minute in seconds
        { label: "second", value: 1 }, // Second in seconds
    ];

    for (let index = 0; index < intervals.length; index++) {
        const interval = intervals[index];
        const count = Math.floor(differenceInSeconds / interval.value);

        if (count >= 1) {
            return `${count} ${interval.label} ago`;
        }
    }

    return "just now";
}
