import type { Metadata } from "next";
import { ThemeBootstrap } from "./theme-bootstrap";
import { CRT } from "../src";
import "../src/styles.css";
import "./docs.css";

export const metadata: Metadata = {
  title: "tuxedo — dress code for the terminal",
  description:
    "A React + TypeScript design system with dual themes — phosphor CRT by night, oxford editorial by day. Ships a real terminal REPL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeBootstrap />
        <CRT />
        {children}
      </body>
    </html>
  );
}
