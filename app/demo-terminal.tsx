"use client";
import * as React from "react";
import { Terminal, type CommandRegistry } from "../src";

const extraCommands: CommandRegistry = {
  about: {
    name: "about",
    description: "about tuxedo",
    handler: (ctx) => {
      ctx.write("tuxedo is a dual-mode design system.");
      ctx.write("dark = phosphor (CRT) · light = oxford (editorial).");
      ctx.write("run 'help' to see everything.");
    },
  },
  projects: {
    name: "projects",
    description: "list things i've built",
    handler: (ctx) => {
      const rows = [
        ["raytracer",   "C++ path-traced renderer"],
        ["webserv",     "HTTP/1.1 server from scratch (C++)"],
        ["minishell",   "POSIX shell clone (C)"],
        ["vr-terrarium","Unity VR interactive garden"],
      ];
      rows.forEach(([name, desc]) => {
        ctx.write(
          <span>
            <span style={{ color: "var(--tux-accent)" }}>{name.padEnd(16)}</span>
            <span style={{ color: "var(--tux-fg-muted)" }}>{desc}</span>
          </span>
        );
      });
    },
  },
};

export function DemoTerminal() {
  return (
    <Terminal
      env={{ USER: "amine", HOST: "tuxedo" }}
      commands={extraCommands}
      greeting={
        <div>
          <div style={{ color: "var(--tux-accent)" }}>welcome to tuxedo — v0.0.1</div>
          <div style={{ color: "var(--tux-fg-muted)" }}>
            type <span style={{ color: "var(--tux-accent)" }}>help</span> to see commands ·{" "}
            <span style={{ color: "var(--tux-accent)" }}>banner</span> for flair ·{" "}
            <span style={{ color: "var(--tux-accent)" }}>theme toggle</span> to flip modes
          </div>
        </div>
      }
    />
  );
}
