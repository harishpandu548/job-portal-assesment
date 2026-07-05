import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-violet-500 text-white hover:bg-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] shadow-lg shadow-violet-500/30",
        destructive: "bg-red-500 text-white hover:bg-red-400 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
        outline: "border border-white/20 bg-transparent hover:bg-white/10 hover:border-white/40 text-white",
        ghost: "hover:bg-white/10 text-white/80 hover:text-white",
        secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/20",
        link: "text-violet-400 underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 text-white hover:from-violet-400 hover:via-fuchsia-400 hover:to-cyan-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.5)] shadow-lg shadow-fuchsia-500/30 bg-[length:200%_100%] animate-shimmer",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-12 text-lg font-bold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

// We omit 'onAnimationStart', 'onDragStart', etc. to avoid TS conflicts between motion and standard HTML props if needed, but HTMLMotionProps handles most.
export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">>,
    HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
