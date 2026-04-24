import * as React from "react";
import { cn } from "../../lib/cn";

export interface TerminalWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Window title shown in the chrome bar. */
  title?: string;
  /** Show traffic-light dots. Default: true. */
  dots?: boolean;
  /** Extra content slotted to the right of the title bar. */
  bar?: React.ReactNode;
}

export const TerminalWindow = React.forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ title = "tuxedo — zsh", dots = true, bar, className, children, ...props }, ref) => (
    <div ref={ref} className={cn("tx-tw", className)} {...props}>
      <div className="tx-tw__bar">
        {dots && (
          <div className="tx-tw__dots" aria-hidden>
            <span className="tx-tw__dot tx-tw__dot--r" />
            <span className="tx-tw__dot tx-tw__dot--y" />
            <span className="tx-tw__dot tx-tw__dot--g" />
          </div>
        )}
        <div className="tx-tw__title">{title}</div>
        {bar ? <div className="tx-tw__bar-extra">{bar}</div> : <div style={{ width: 44 }} aria-hidden />}
      </div>
      <div className="tx-tw__body">{children}</div>
    </div>
  )
);
TerminalWindow.displayName = "TerminalWindow";
