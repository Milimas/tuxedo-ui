import * as React from "react";
import { cn } from "../../lib/cn";

export type ButtonVariant = "phosphor" | "solid" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "phosphor", size = "md", className, children, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("tx-btn", `tx-btn--${variant}`, `tx-btn--${size}`, className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
