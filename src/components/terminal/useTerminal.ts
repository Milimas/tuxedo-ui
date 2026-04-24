import * as React from "react";
import type { ReactNode } from "react";
import type { Command, CommandContext, CommandRegistry, TerminalLine } from "./types";

let _uid = 0;
const uid = () => `${Date.now().toString(36)}-${(_uid++).toString(36)}`;

export interface UseTerminalOptions {
  commands: CommandRegistry;
  env?: Record<string, string>;
  /** Greeting lines emitted on first mount. */
  greeting?: ReactNode;
  ps1?: string;
}

export interface UseTerminalResult {
  lines: TerminalLine[];
  input: string;
  setInput: (v: string) => void;
  history: string[];
  submit: () => Promise<void>;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clear: () => void;
  write: (content: ReactNode) => void;
  writeError: (content: ReactNode) => void;
}

export function useTerminal({ commands, env = {}, greeting, ps1 = "$" }: UseTerminalOptions): UseTerminalResult {
  const [lines, setLines] = React.useState<TerminalLine[]>(() =>
    greeting ? [{ id: uid(), kind: "output", content: greeting }] : []
  );
  const [input, setInput] = React.useState("");
  const [history, setHistory] = React.useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = React.useState<number>(-1);
  const [draft, setDraft] = React.useState<string>("");

  const commandsRef = React.useRef(commands);
  commandsRef.current = commands;
  const envRef = React.useRef(env);
  envRef.current = env;
  const historyRef = React.useRef(history);
  historyRef.current = history;

  const write = React.useCallback((content: ReactNode) => {
    setLines((ls) => [...ls, { id: uid(), kind: "output", content }]);
  }, []);

  const writeError = React.useCallback((content: ReactNode) => {
    setLines((ls) => [...ls, { id: uid(), kind: "error", content }]);
  }, []);

  const clear = React.useCallback(() => setLines([]), []);

  const run = React.useCallback(async (raw: string) => {
    const trimmed = raw.trim();
    setLines((ls) => [...ls, { id: uid(), kind: "echo", ps1, input: raw }]);
    if (!trimmed) return;

    const [name, ...args] = trimmed.split(/\s+/);
    const cmd: Command | undefined = commandsRef.current[name];

    if (!cmd) {
      writeError(`${name}: command not found. Type 'help' for options.`);
      return;
    }

    const ctx: CommandContext = {
      args,
      raw: trimmed.slice(name.length).trim(),
      input: raw,
      write,
      writeError,
      clear,
      history: historyRef.current,
      commands: commandsRef.current,
      env: envRef.current,
    };

    try {
      await cmd.handler(ctx);
    } catch (err) {
      writeError(err instanceof Error ? err.message : String(err));
    }
  }, [clear, ps1, write, writeError]);

  const submit = React.useCallback(async () => {
    const line = input;
    setInput("");
    setHistoryIdx(-1);
    setDraft("");
    if (line.trim()) {
      setHistory((h) => {
        const next = h[h.length - 1] === line.trim() ? h : [...h, line.trim()];
        historyRef.current = next;
        return next;
      });
    }
    await run(line);
  }, [input, run]);

  const tabComplete = React.useCallback(() => {
    const tokens = input.split(/(\s+)/);
    const head = tokens.slice(0, -1).join("");
    const last = tokens[tokens.length - 1] ?? "";
    const atCommand = input.trim().length > 0 && head.trim() === "";

    let candidates: string[] = [];
    if (atCommand) {
      const prefix = last;
      candidates = Object.keys(commandsRef.current).filter((n) => n.startsWith(prefix));
    } else {
      const [name, ...rest] = input.trim().split(/\s+/);
      const cmd = commandsRef.current[name];
      if (cmd?.complete) {
        candidates = cmd.complete(rest).filter((c) => c.startsWith(last));
      }
    }

    if (candidates.length === 1) {
      const [only] = candidates;
      setInput(head + only + " ");
    } else if (candidates.length > 1) {
      // print options; keep input
      write(
        React.createElement(
          "div",
          { className: "tx-term__complete" },
          candidates.join("   ")
        )
      );
      // complete to longest common prefix
      const lcp = candidates.reduce((acc, s) => {
        let i = 0;
        while (i < acc.length && i < s.length && acc[i] === s[i]) i++;
        return acc.slice(0, i);
      }, candidates[0]);
      if (lcp.length > last.length) setInput(head + lcp);
    }
  }, [input, write]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Ctrl+L clears
      if (e.ctrlKey && (e.key === "l" || e.key === "L")) {
        e.preventDefault();
        clear();
        return;
      }
      // Ctrl+C cancels current line
      if (e.ctrlKey && (e.key === "c" || e.key === "C")) {
        e.preventDefault();
        setLines((ls) => [...ls, { id: uid(), kind: "echo", ps1, input: input + "^C" }]);
        setInput("");
        setHistoryIdx(-1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        void submit();
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        tabComplete();
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          const h = historyRef.current;
          if (h.length === 0) return prev;
          const next = prev === -1 ? h.length - 1 : Math.max(0, prev - 1);
          if (prev === -1) setDraft(input);
          setInput(h[next]);
          return next;
        });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIdx((prev) => {
          const h = historyRef.current;
          if (prev === -1) return -1;
          const next = prev + 1;
          if (next >= h.length) {
            setInput(draft);
            return -1;
          }
          setInput(h[next]);
          return next;
        });
        return;
      }
    },
    [clear, draft, input, ps1, submit, tabComplete]
  );

  return { lines, input, setInput, history, submit, onKeyDown, clear, write, writeError };
}
