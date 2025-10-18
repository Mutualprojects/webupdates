import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer4Col from "./Footer";
import ChatPanel from "./ChatPanel";
import ScrollToTop from "./Scrooltop";
import ScrollToTopButton from "./ScrollToTopButton";

/**
 * Responsive shell:
 * - Sticky header with blur + border
 * - Main grows to fill viewport (footer stays at bottom)
 * - Content container: max-w-7xl with responsive paddings
 * - Full-bleed support: place sections with data-full-bleed
 */
export default function Layout() {
  const headerRef = useRef(null);

  // (Optional) keep a CSS var with header height for sticky offsets
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const setHeaderVar = () =>
      document.documentElement.style.setProperty(
        "--header-h",
        `${el.offsetHeight}px`
      );

    setHeaderVar();
    const ro = new ResizeObserver(setHeaderVar);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-white text-slate-900">
      {/* Skip link (accessibility) */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>

      {/* Sticky Header */}
      <div
        ref={headerRef}
        className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
      >
        <Header />
        <ScrollToTop />
      </div>

      {/* Main content area */}
      <main id="content" className="flex-1 relative">
        {/* Page content */}
        <div className="py-14">
          <Outlet />
        </div>

        {/* Floating Actions: Chat + Scroll */}
        <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
          <ChatPanel />
          <ScrollToTopButton />
        </div>
      </main>

      {/* Footer */}

      <Footer4Col />
    </div>
  );
}
