"use client";

import { smoothScrollTo } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";
import React from "react";

interface SmoothScrollButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    targetId: string;
    children: React.ReactNode;
}

export function SmoothScrollButton({ targetId, children, className, ...props }: SmoothScrollButtonProps) {
    return (
        <a
            href={`#${targetId}`}
            onClick={(e) => smoothScrollTo(e, targetId)}
            className={cn("cursor-pointer", className)}
            {...props}
        >
            {children}
        </a>
    );
}
