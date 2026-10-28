"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

interface SnapScrollShellProps {
  readonly children: ReactNode;
}

export default function SnapScrollShell({ children }: SnapScrollShellProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [showJumpTop, setShowJumpTop] = useState<boolean>(false);

  const handleScroll = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const shouldShow = el.scrollTop > el.clientHeight * 0.35;
    setShowJumpTop((prev) => (prev !== shouldShow ? shouldShow : prev));
  }, []);

  const jumpToTop = useCallback(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-primary">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        data-testid="root-snap-scroller"
        className="snap_container"
      >
        {children}
      </div>

      <button
        type="button"
        onClick={jumpToTop}
        aria-label="Jump to top"
        className={`fixed bottom-6 right-6 z-120 flex h-12 w-12 items-center justify-center border-2 border-secondary bg-accent-primary font-mono text-lg font-bold text-primary shadow-[4px_4px_0_var(--color-secondary)] transition-all duration-200 hover:bg-accent-secondary active:translate-x-1 active:translate-y-1 active:shadow-none ${
          showJumpTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        &uarr;
      </button>
    </div>
  );
}