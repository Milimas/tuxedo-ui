# tuxedo

> dress code for the terminal.

A React + TypeScript design system with two moods:

- **dark** — phosphor CRT / matrix / 1337
- **light** — oxford editorial (cream paper, deep blue, serif body)

Ships with tokens, primitives, and a real, working **terminal REPL** component — not a prop.

```
npm install tuxedo-ui
```

## quick start

```tsx
import "tuxedo-ui/styles.css";
import { Button, TerminalWindow, Terminal } from "tuxedo-ui";

export default function App() {
  return (
    <>
      <Button variant="phosphor">Run</Button>

      <TerminalWindow title="~/portfolio">
        <Terminal greeting="welcome. type 'help'." />
      </TerminalWindow>
    </>
  );
}
```

## themes

Set `data-theme` on `<html>`:

```html
<html data-theme="dark"> <!-- or "light" -->
```

Users can switch live by running `theme toggle` inside any live Terminal.

## develop

```
npm install
npm run dev
```

Then open http://localhost:3000.
