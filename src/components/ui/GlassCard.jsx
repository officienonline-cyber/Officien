
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export const GlassCard = ({
  children,
  hover = true,
  glow = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-surface/75 backdrop-blur-xl border border-white/[0.06] rounded-2xl",
          {
            "transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/25 hover:shadow-[0_12px_30px_-10px_rgba(99,102,241,0.15)]":
              hover,
            "shadow-[0_0_40px_rgba(99,102,241,0.08)]": glow,
          },
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
