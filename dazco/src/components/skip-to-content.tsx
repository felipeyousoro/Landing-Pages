export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="absolute left-4 top-4 z-[100] -translate-y-[calc(100%+2rem)] rounded-md bg-white px-4 py-2 text-sm font-semibold text-neutral shadow-lg outline-none ring-2 ring-transparent transition-transform focus:translate-y-0 focus:ring-primary"
    >
      Skip to content
    </a>
  );
}
