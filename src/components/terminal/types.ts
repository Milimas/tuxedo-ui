import type { ReactNode } from "react";

/** A single output line rendered in the terminal scrollback. */
export type TerminalLine =
  | { id: string; kind: "output"; content: ReactNode }
  | { id: string; kind: "error"; content: ReactNode }
  | { id: string; kind: "echo"; ps1: string; input: string };

/** Execution context passed to every command handler. */
export interface CommandContext {
  /** Space-split positional args (excludes the command name). */
  args: string[];
  /** The raw command line (excludes the command name). */
  raw: string;
  /** The full input line as typed. */
  input: string;
  /** Write an output line. Accepts strings or React nodes. */
  write: (content: ReactNode) => void;
  /** Write an error line (styled red). */
  writeError: (content: ReactNode) => void;
  /** Clear all output from the scrollback. */
  clear: () => void;
  /** Full command history, oldest first. */
  history: readonly string[];
  /** All registered commands (defaults merged with user-provided). */
  commands: Readonly<CommandRegistry>;
  /** Arbitrary bag of env data — consumer can seed via Terminal `env` prop. */
  env: Readonly<Record<string, string>>;
}

export interface Command {
  /** Canonical name used to invoke the command. */
  name: string;
  /** One-line description shown in `help`. */
  description: string;
  /** Optional usage string shown in `man <name>`. */
  usage?: string;
  /** Hide from `help` listing (still runnable). */
  hidden?: boolean;
  /** Command implementation. May be sync or async. */
  handler: (ctx: CommandContext) => void | Promise<void>;
  /** Optional completer. Receives args so far; returns candidate strings. */
  complete?: (args: string[]) => string[];
}

export type CommandRegistry = Record<string, Command>;
