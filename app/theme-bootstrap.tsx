/**
 * Sets [data-theme] on <html> before React hydrates, to avoid a
 * light/dark flash on first paint. Reads `localStorage["tuxedo-theme"]`.
 */
export function ThemeBootstrap() {
  const script = `
(function () {
  try {
    var stored = localStorage.getItem("tuxedo-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    var crt = localStorage.getItem("tuxedo-crt");
    if (crt === "off") document.documentElement.setAttribute("data-crt", "off");
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
  `.trim();
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
