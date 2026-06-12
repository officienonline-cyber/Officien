import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center font-medium rounded-full transition-all duration-350 outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          {
            // Variants
            "bg-accent text-text-primary hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]":
              variant === "primary",
            "border border-accent/40 bg-transparent text-text-primary hover:bg-accent/10 hover:border-accent":
              variant === "outline",
            "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5":
              variant === "ghost",

            // Sizes
            "text-xs px-4 py-1.5 h-8": size === "sm",
            "text-sm px-6 py-2.5 h-10": size === "md",
            "text-base px-8 py-3.5 h-12": size === "lg",
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
};
