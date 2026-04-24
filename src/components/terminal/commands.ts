import * as React from "react";
import type { Command, CommandRegistry } from "./types";

/* ── helpers ───────────────────────────────────────────────── */
const pad = (s: string, n: number) => (s + " ".repeat(n)).slice(0, n);

/* ── default commands ─────────────────────────────────────── */

const help: Command = {
  name: "help",
  description: "list available commands",
  handler: (ctx) => {
    const visible = Object.values(ctx.commands).filter((c) => !c.hidden);
    const width = Math.max(...visible.map((c) => c.name.length)) + 2;
    const lines = visible
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) =>
        React.createElement(
          "div",
          { key: c.name, className: "tx-term__helprow" },
          React.createElement("span", { className: "tx-term__helpname" }, pad(c.name, width)),
          React.createElement("span", { className: "tx-term__helpdesc" }, c.description)
        )
      );
    ctx.write(
      React.createElement(
        "div",
        null,
        React.createElement("div", { className: "tx-term__dim" }, "available commands:"),
        React.createElement("div", { className: "tx-term__helplist" }, lines),
        React.createElement(
          "div",
          { className: "tx-term__dim", style: { marginTop: 8 } },
          "tip: Tab to complete · ↑/↓ history · Ctrl+L clear"
        )
      )
    );
  },
};

const clear: Command = {
  name: "clear",
  description: "clear the terminal",
  handler: (ctx) => ctx.clear(),
};

const echo: Command = {
  name: "echo",
  description: "print arguments back to the terminal",
  usage: "echo [text...]",
  handler: (ctx) => ctx.write(ctx.raw),
};

const whoami: Command = {
  name: "whoami",
  description: "who is logged in?",
  handler: (ctx) => ctx.write(ctx.env.USER ?? "guest"),
};

const date: Command = {
  name: "date",
  description: "print the current date and time",
  handler: (ctx) => ctx.write(new Date().toString()),
};

const history: Command = {
  name: "history",
  description: "show command history",
  handler: (ctx) => {
    ctx.history.forEach((cmd, i) =>
      ctx.write(
        React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            { className: "tx-term__dim" },
            pad(String(i + 1), 4)
          ),
          cmd
        )
      )
    );
  },
};

const theme: Command = {
  name: "theme",
  description: "switch color theme  (theme dark | light | toggle)",
  usage: "theme <dark|light|toggle>",
  handler: (ctx) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") ?? "dark";
    const arg = (ctx.args[0] ?? "toggle").toLowerCase();
    const next =
      arg === "toggle" ? (current === "dark" ? "light" : "dark") :
      arg === "dark" || arg === "light" ? arg :
      null;
    if (!next) return ctx.writeError(`unknown theme: '${arg}' (expected dark|light|toggle)`);
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("tuxedo-theme", next); } catch {}
    ctx.write(`theme → ${next}`);
  },
  complete: (args) => (args.length <= 1 ? ["dark", "light", "toggle"] : []),
};

const banner: Command = {
  name: "banner",
  description: "print the tuxedo banner",
  handler: (ctx) =>
    ctx.write(
      React.createElement("pre", { className: "tx-term__banner" },
`  ████████╗██╗   ██╗██╗  ██╗███████╗██████╗  ██████╗
  ╚══██╔══╝██║   ██║╚██╗██╔╝██╔════╝██╔══██╗██╔═══██╗
     ██║   ██║   ██║ ╚███╔╝ █████╗  ██║  ██║██║   ██║
     ██║   ██║   ██║ ██╔██╗ ██╔══╝  ██║  ██║██║   ██║
     ██║   ╚██████╔╝██╔╝ ██╗███████╗██████╔╝╚██████╔╝
     ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝  ╚═════╝
              dress code for the terminal.`
      )
    ),
};

const man: Command = {
  name: "man",
  description: "show usage for a command",
  usage: "man <command>",
  handler: (ctx) => {
    const name = ctx.args[0];
    if (!name) return ctx.writeError("man: what manual page do you want?");
    const cmd = ctx.commands[name];
    if (!cmd) return ctx.writeError(`no manual entry for ${name}`);
    ctx.write(
      React.createElement("div", null,
        React.createElement("div", { className: "tx-term__hi" }, `NAME`),
        React.createElement("div", { style: { paddingLeft: 16 } }, `${cmd.name} — ${cmd.description}`),
        cmd.usage && React.createElement("div", { className: "tx-term__hi", style: { marginTop: 8 } }, "USAGE"),
        cmd.usage && React.createElement("div", { style: { paddingLeft: 16 } }, cmd.usage)
      )
    );
  },
  complete: (args) => (args.length <= 1 ? Object.keys(args as unknown as object) : []),
};

const sudo: Command = {
  name: "sudo",
  description: "channel your inner XKCD",
  hidden: true,
  handler: (ctx) => {
    const rest = ctx.raw.trim();
    if (rest === "make me a sandwich") return ctx.write("🥪  okay.");
    if (rest === "rm -rf /") return ctx.writeError("nice try.");
    ctx.writeError(`${ctx.env.USER ?? "you"} is not in the sudoers file. This incident will be reported.`);
  },
};

const exit: Command = {
  name: "exit",
  description: "close the terminal (if in overlay mode)",
  handler: (ctx) => {
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("tuxedo:terminal:exit"));
    ctx.write("bye.");
  },
};

const crt: Command = {
  name: "crt",
  description: "toggle CRT effects  (crt on | off | toggle)",
  usage: "crt <on|off|toggle>",
  handler: (ctx) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const cur = root.getAttribute("data-crt") === "off" ? "off" : "on";
    const arg = (ctx.args[0] ?? "toggle").toLowerCase();
    const next =
      arg === "on" ? "on" :
      arg === "off" ? "off" :
      arg === "toggle" ? (cur === "on" ? "off" : "on") :
      null;
    if (!next) return ctx.writeError(`unknown arg: '${arg}' (expected on|off|toggle)`);
    root.setAttribute("data-crt", next);
    try { localStorage.setItem("tuxedo-crt", next); } catch {}
    ctx.write(`crt → ${next}`);
  },
  complete: (args) => (args.length <= 1 ? ["on", "off", "toggle"] : []),
};

export const defaultCommands: CommandRegistry = {
  help: help,
  clear,
  echo,
  whoami,
  date,
  history,
  theme,
  crt,
  banner,
  man,
  sudo,
  exit,
};
