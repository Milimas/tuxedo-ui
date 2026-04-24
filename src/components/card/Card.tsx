"use client";
import * as React from "react";
import { cn } from "../../lib/cn";

export type CardVariant = "plain" | "hover" | "framed";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  /** Enable mouse-tracked parallax tilt + cursor-following sheen. */
  tilt?: boolean;
  /** Max rotation in degrees at the edge. Default: 8. */
  tiltIntensity?: number;
  /** Lift amount applied during tilt. Default: 6 (px). */
  tiltLift?: number;
  /** Render as a link (semantic `<a>`). */
  href?: string;
  target?: string;
  rel?: string;
}

function useTilt(enabled: boolean, intensity: number, lift: number) {
  const ref = React.useRef<HTMLElement | null>(null);

  const handlers = React.useMemo(() => {
    if (!enabled) return {};
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return {};
    }

    const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - ny) * intensity;
      const ry = (nx - 0.5) * intensity;
      el.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-${lift}px)`;
      el.style.setProperty("--tx-mx", `${(nx * 100).toFixed(1)}%`);
      el.style.setProperty("--tx-my", `${(ny * 100).toFixed(1)}%`);
      el.dataset.tiltActive = "true";
    };

    const onPointerLeave = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = "";
      el.style.removeProperty("--tx-mx");
      el.style.removeProperty("--tx-my");
      el.dataset.tiltActive = "false";
    };

    return { onPointerMove, onPointerLeave };
  }, [enabled, intensity, lift]);

  return { ref, handlers };
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = "plain",
    tilt = false,
    tiltIntensity = 8,
    tiltLift = 6,
    className,
    href,
    target,
    rel,
    children,
    ...props
  },
  ref
) {
  const { ref: tiltRef, handlers } = useTilt(tilt, tiltIntensity, tiltLift);

  const combinedRef = React.useCallback(
    (node: HTMLElement | null) => {
      tiltRef.current = node;
      if (typeof ref === "function") ref(node as HTMLDivElement);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
    },
    [ref, tiltRef]
  );

  const classes = cn(
    "tx-card",
    `tx-card--${variant}`,
    tilt && "tx-card--tilt",
    className
  );

  const sheen = tilt ? <span className="tx-card__sheen" aria-hidden /> : null;

  if (href) {
    return (
      <a
        ref={combinedRef as unknown as React.Ref<HTMLAnchorElement>}
        className={classes}
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noreferrer noopener" : undefined)}
        {...handlers}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {sheen}
        {children}
      </a>
    );
  }
  return (
    <div
      ref={combinedRef as unknown as React.Ref<HTMLDivElement>}
      className={classes}
      {...handlers}
      {...props}
    >
      {sheen}
      {children}
    </div>
  );
});
