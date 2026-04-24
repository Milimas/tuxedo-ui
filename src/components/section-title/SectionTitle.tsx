import * as React from "react";
import { cn } from "../../lib/cn";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number prefix, e.g. "01". Rendered with a `.` suffix. */
  num?: string;
  /** Small note rendered after the title (e.g. "// live REPL"). */
  aside?: React.ReactNode;
  /** Render the trailing horizontal rule. Default: true. */
  rule?: boolean;
  /** Underlying heading tag. Default: "h2". */
  as?: "h1" | "h2" | "h3" | "h4";
}

export const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  function SectionTitle(
    { num, aside, rule = true, as = "h2", className, children, ...props },
    ref
  ) {
    const Heading = as;
    return (
      <div ref={ref} className={cn("tx-section-title", className)} {...props}>
        {num && <span className="tx-section-title__num">{num}.</span>}
        <Heading className="tx-section-title__text">{children}</Heading>
        {aside && <span className="tx-section-title__aside">{aside}</span>}
        {rule && <span className="tx-section-title__rule" aria-hidden />}
      </div>
    );
  }
);
