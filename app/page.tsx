import * as React from "react";
import { Button, TerminalWindow } from "../src";
import { ThemeToggle } from "./theme-toggle";
import { DemoTerminal } from "./demo-terminal";

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
          the <em>terminal</em>.
        </h1>
        <p className="docs-hero__lede">
          A design system with two moods: phosphor CRT by night, oxford editorial by day.
          Ships with tokens, primitives, and a real, working terminal REPL — not a prop.
        </p>
      </section>

      {/* ── BUTTONS ─────────────────────────────────────── */}
      <section className="docs-section">
        <div className="docs-section__head">
          <span className="docs-section__num">01.</span>
          <h2 className="docs-section__title">button</h2>
          <div className="docs-section__rule" />
        </div>
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

      {/* ── TERMINAL WINDOW ─────────────────────────────── */}
      <section className="docs-section">
        <div className="docs-section__head">
          <span className="docs-section__num">02.</span>
          <h2 className="docs-section__title">terminal_window</h2>
          <div className="docs-section__rule" />
        </div>
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
        <div className="docs-section__head">
          <span className="docs-section__num">03.</span>
          <h2 className="docs-section__title">terminal   <span style={{ color: "var(--tux-fg-subtle)", fontWeight: 400 }}>// live REPL</span></h2>
          <div className="docs-section__rule" />
        </div>
        <div className="docs-card">
          <div className="docs-label">try: help · theme · banner · sudo make me a sandwich</div>
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
