import * as React from "react";
import { cn } from "../../lib/cn";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn("tx-card__header", className)} {...props} />;
  }
);

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardBody({ className, ...props }, ref) {
    return <div ref={ref} className={cn("tx-card__body", className)} {...props} />;
  }
);

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn("tx-card__footer", className)} {...props} />;
  }
);

export const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  function CardTitle({ className, ...props }, ref) {
    return <div ref={ref} className={cn("tx-card__title", className)} {...props} />;
  }
);

export const CardText = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  function CardText({ className, ...props }, ref) {
    return <p ref={ref} className={cn("tx-card__text", className)} {...props} />;
  }
);

export function CardCorners({ className }: { className?: string }) {
  return (
    <div className={cn("tx-card__corners", className)} aria-hidden>
      <span className="tx-card__corner tx-card__corner--tl" />
      <span className="tx-card__corner tx-card__corner--tr" />
      <span className="tx-card__corner tx-card__corner--bl" />
      <span className="tx-card__corner tx-card__corner--br" />
    </div>
  );
}

export function CardGrid({ className }: { className?: string }) {
  return <div className={cn("tx-card__grid", className)} aria-hidden />;
}
