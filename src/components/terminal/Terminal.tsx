"use client";
import * as React from "react";
import { cn } from "../../lib/cn";
import { defaultCommands } from "./commands";
import { useTerminal } from "./useTerminal";
import type { CommandRegistry, TerminalLine } from "./types";

export interface TerminalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Extra commands merged on top of the defaults. */
  commands?: CommandRegistry;
  /** Replace defaults entirely. */
  replaceCommands?: boolean;
  /** Seed env bag (e.g. `{ USER: "amine" }`). */
  env?: Record<string, string>;
  /** First-paint greeting (ReactNode). */
  greeting?: React.ReactNode;
  /** Prompt prefix. Default: `"$"`. */
  ps1?: string;
  /** Autofocus the input on mount. Default: true. */
  autoFocus?: boolean;
}

function renderLine(l: TerminalLine, ps1: string): React.ReactNode {
  if (l.kind === "echo") {
    return (
      <div key={l.id} className="tx-term__echo">
        <span className="tx-term__ps">{l.ps1 ?? ps1}</span>
        <span>{l.input}</span>
      </div>
    );
  }
  return (
    <div
      key={l.id}
      className={cn("tx-term__line", l.kind === "error" && "tx-term__line--error")}
    >
      {l.content}
    </div>
  );
}

export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(function Terminal(
  {
    commands,
    replaceCommands = false,
    env,
    greeting,
    ps1 = "$",
    autoFocus = true,
    className,
    ...props
  },
  ref
) {
  const merged = React.useMemo<CommandRegistry>(() => {
    if (replaceCommands) return commands ?? {};
    return { ...defaultCommands, ...(commands ?? {}) };
  }, [commands, replaceCommands]);

  const { lines, input, setInput, onKeyDown } = useTerminal({
    commands: merged,
    env,
    greeting,
    ps1,
  });

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // auto-scroll on new lines
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines.length]);

  // autofocus
  React.useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div
      ref={ref}
      className={cn("tx-term", className)}
      onClick={() => inputRef.current?.focus()}
      {...props}
    >
      <div className="tx-term__scroll" ref={scrollRef}>
        {lines.map((l) => renderLine(l, ps1))}
        <div className="tx-term__inputline">
          <span className="tx-term__ps">{ps1}</span>
          <input
            ref={inputRef}
            className="tx-term__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  );
});
