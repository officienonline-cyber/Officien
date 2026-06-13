
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const Badge = ({
  label,
  variant = "accent",
  className,
}) => {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-block font-sans text-[11px] font-medium tracking-[0.12em] uppercase px-2.5 py-1 rounded-[6px] w-fit",
          {
            "bg-accent/15 text-accent border border-accent/20": variant === "accent",
            "bg-success/15 text-success border border-success/20": variant === "success",
            "bg-white/[0.04] text-text-secondary border border-white/[0.06]": variant === "ghost",
          },
          className
        )
      )}
    >
      {label}
    </span>
  );
};
