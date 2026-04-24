import * as React from "react";
import {
  Button,
  Card,
  CardBody,
  CardCorners,
  CardFooter,
  CardGrid,
  CardHeader,
  CardText,
  CardTitle,
  Glitch,
  SectionTitle,
  TerminalWindow,
} from "../src";
import { ThemeToggle } from "./theme-toggle";
import { DemoTerminal } from "./demo-terminal";

const projects: Array<[string, string, string]> = [
  ["raytracer",    "C++ path-traced renderer",              "C · Math · OpenGL"],
  ["webserv",      "HTTP/1.1 server from scratch",          "C++ · epoll · POSIX"],
  ["minishell",    "POSIX shell clone",                     "C · fork · exec"],
  ["vr-terrarium", "Unity VR interactive garden",           "C# · Unity · XR"],
  ["cub3d",        "Raycasting maze renderer",              "C · SDL · MLX"],
  ["philosophers", "Dining philosophers simulator",         "C · threads · mutex"],
];

export default function Page() {
  return (
    <main className="docs-shell">
      <header className="docs-topbar">
        <a href="/" className="docs-brand">
          tuxedo
          <span className="docs-brand__tag">v0.0.1 · research preview</span>
        </a>
        <div className="docs-toolbar">
          <ThemeToggle />
          <Button variant="phosphor" size="sm">GitHub →</Button>
        </div>
      </header>

      <section className="docs-hero">
        <span className="docs-hero__eyebrow">$ man tuxedo</span>
        <h1 className="docs-hero__title">
          dress code for<br />
          the <em><Glitch text="terminal">terminal</Glitch></em>.
        </h1>
        <p className="docs-hero__lede">
          A design system with two moods: phosphor CRT by night, oxford editorial by day.
          Ships with tokens, primitives, and a real, working terminal REPL — not a prop.
        </p>
      </section>

      {/* ── BUTTONS ─────────────────────────────────────── */}
      <section className="docs-section">
        <SectionTitle num="01">button</SectionTitle>
        <div className="docs-card">
          <div>
            <div className="docs-label">variants</div>
            <div className="docs-row">
              <Button variant="phosphor">Phosphor</Button>
              <Button variant="solid">Solid</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          <div>
            <div className="docs-label">sizes</div>
            <div className="docs-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARDS ───────────────────────────────────────── */}
      <section className="docs-section">
        <SectionTitle num="02" aside="// compound · hover · framed">card</SectionTitle>
        <div className="docs-card">
          <div className="docs-label">grid of hover cards</div>
          <div className="docs-cardgrid">
            {projects.map(([title, desc, tech]) => (
              <Card variant="hover" tilt key={title}>
                <CardHeader>
                  <span>/* project */</span>
                  <span>↗</span>
                </CardHeader>
                <CardBody>
                  <CardTitle>{title}</CardTitle>
                  <CardText>{desc}</CardText>
                </CardBody>
                <CardFooter>
                  <span>{tech}</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="docs-label" style={{ marginTop: "var(--tux-space-6)" }}>
            framed — grid overlay + corner accents appear on hover
          </div>
          <Card variant="framed" tilt tiltIntensity={10}>
            <CardGrid />
            <CardCorners />
            <CardBody style={{ minHeight: 240, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <CardTitle style={{ fontSize: "var(--tux-text-2xl)", letterSpacing: "var(--tux-tracking-wider)" }}>
                FEATURED_PROJECT
              </CardTitle>
              <CardText>move your mouse — the card tilts, corners brighten, a sheen follows the cursor.</CardText>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* ── GLITCH ──────────────────────────────────────── */}
      <section className="docs-section">
        <SectionTitle num="03" aside="// RGB-shift · ~every 6s">glitch</SectionTitle>
        <div className="docs-card">
          <div className="docs-label">wrap any text — it stutters periodically</div>
          <div style={{ fontFamily: "var(--tux-font-mono)", fontSize: "var(--tux-text-3xl)", fontWeight: 700 }}>
            <Glitch>SYSTEM_ONLINE</Glitch>
          </div>
          <div style={{ fontFamily: "var(--tux-font-mono)", fontSize: "var(--tux-text-xl)", fontWeight: 700, color: "var(--tux-accent)" }}>
            <Glitch>Amine Beihaqi.</Glitch>
          </div>
          <div style={{ color: "var(--tux-fg-muted)", fontSize: "var(--tux-text-sm)" }}>
            Auto-hides in oxford mode. Respects <code>prefers-reduced-motion</code>.
          </div>
        </div>
      </section>

      {/* ── TERMINAL WINDOW ─────────────────────────────── */}
      <section className="docs-section">
        <SectionTitle num="04">terminal_window</SectionTitle>
        <div className="docs-card">
          <div className="docs-label">chrome only — compose any body</div>
          <TerminalWindow title="~/projects/portfolio — zsh">
            <div style={{ padding: "16px 20px", fontFamily: "var(--tux-font-mono)", fontSize: "var(--tux-text-sm)" }}>
              <div><span style={{ color: "var(--tux-accent)" }}>$</span> ls projects/</div>
              <div style={{ color: "var(--tux-fg-muted)" }}>raytracer/   webserver/   shell/   vr-demo/</div>
              <div style={{ marginTop: 6 }}><span style={{ color: "var(--tux-accent)" }}>$</span> _</div>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* ── LIVE TERMINAL ───────────────────────────────── */}
      <section className="docs-section">
        <SectionTitle num="05" aside="// live REPL">terminal</SectionTitle>
        <div className="docs-card">
          <div className="docs-label">try: help · theme toggle · crt off · banner · sudo make me a sandwich</div>
          <TerminalWindow title="amine@tuxedo — ~/" className="docs-term-shell">
            <DemoTerminal />
          </TerminalWindow>
        </div>
      </section>

      <footer className="docs-footer">
        tuxedo — built with 🐧 by amine beihaqi
      </footer>
    </main>
  );
}
