"use client";

import { useEffect, useState } from "react";

export default function JumpToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Jump to top"
      className={`fixed bottom-6 right-6 z-220 flex h-12 w-12 items-center justify-center border-2 border-secondary bg-accent-primary font-mono text-lg font-bold text-primary shadow-[4px_4px_0_var(--color-secondary)] transition-all duration-200 hover:bg-accent-secondary active:translate-x-1 active:translate-y-1 active:shadow-none ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      &uarr;
    </button>
  );
}