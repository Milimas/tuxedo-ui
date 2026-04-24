import * as React from "react";
import { cn } from "../../lib/cn";

export interface GlitchProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text to glitch. Falls back to children if children is a string. */
  text?: string;
}

/**
 * Periodically stutters the given text with RGB-shift slices.
 * For visual-only effect: the clean text renders through `children`,
 * and the glitch slices are rendered via `data-text`.
 */
export const Glitch = React.forwardRef<HTMLSpanElement, GlitchProps>(function Glitch(
  { text, className, children, ...props },
  ref
) {
  const resolved = text ?? (typeof children === "string" ? children : "");
  return (
    <span
      ref={ref}
      className={cn("tx-glitch", className)}
      data-text={resolved}
      {...props}
    >
      {children ?? text}
    </span>
  );
});
