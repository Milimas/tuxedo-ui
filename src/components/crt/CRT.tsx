import * as React from "react";
import { cn } from "../../lib/cn";

export interface CRTProps {
  /** Render horizontal scanlines. Default: true. */
  scanlines?: boolean;
  /** Render soft radial vignette. Default: true. */
  vignette?: boolean;
  /** Render subtle luminance flicker. Default: false (motion-sensitive). */
  flicker?: boolean;
  /** Apply in oxford/light theme too. Default: false. */
  inLightMode?: boolean;
  /** Extra class on the root element. */
  className?: string;
}

/**
 * Full-viewport CRT effect overlay. Decorative only —
 * pointer-events none, aria-hidden. Disabled automatically
 * in oxford/light mode, or when `<html data-crt="off">`.
 */
export function CRT({
  scanlines = true,
  vignette = true,
  flicker = false,
  inLightMode = false,
  className,
}: CRTProps) {
  return (
    <div
      className={cn("tx-crt", inLightMode && "tx-crt--both-modes", className)}
      aria-hidden
    >
      {scanlines && <div className="tx-crt__scanlines" />}
      {vignette && <div className="tx-crt__vignette" />}
      {flicker && <div className="tx-crt__flicker" />}
    </div>
  );
}
