"use client";

import { useEffect, useState, useCallback } from "react";

const VISIBILITY_RATIO = 0.3;
const MIN_PAGE_HEIGHT_MULTIPLIER = 2;
const BOTTOM_TOLERANCE_PX = 24;

export interface ScrollMetrics {
  readonly scrollY: number;
  readonly innerHeight: number;
  readonly scrollHeight: number;
}

export interface JumpToTopState {
  readonly isVisible: boolean;
  readonly isAtBottomOfLongPage: boolean;
}

/**
 * Pure state computation for deterministic unit testing and zero layout thrashing.
 */
export function computeJumpToTopState({
  scrollY,
  innerHeight,
  scrollHeight,
}: ScrollMetrics): JumpToTopState {
  if (innerHeight <= 0) {
    return { isVisible: false, isAtBottomOfLongPage: false };
  }

  const isVisible = scrollY > innerHeight * VISIBILITY_RATIO;
  const isLongPage = scrollHeight > innerHeight * MIN_PAGE_HEIGHT_MULTIPLIER;
  const isAtBottom =
    innerHeight + scrollY >= scrollHeight - BOTTOM_TOLERANCE_PX;

  return {
    isVisible,
    isAtBottomOfLongPage: isVisible && isLongPage && isAtBottom,
  };
}

export default function JumpToTop() {
  const [scrollState, setScrollState] = useState<JumpToTopState>({
    isVisible: false,
    isAtBottomOfLongPage: false,
  });
  const [dialogDismissed, setDialogDismissed] = useState<boolean>(false);

  const evaluateScroll = useCallback(() => {
    const next = computeJumpToTopState({
      scrollY: window.scrollY,
      innerHeight: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight,
    });

    setScrollState((prev) => {
      if (
        prev.isVisible === next.isVisible &&
        prev.isAtBottomOfLongPage === next.isAtBottomOfLongPage
      ) {
        return prev;
      }
      return next;
    });

    // Reset manual dismissal when user scrolls away from the bottom
    if (!next.isAtBottomOfLongPage) {
      setDialogDismissed(false);
    }
  }, []);

  useEffect(() => {
    evaluateScroll();
    window.addEventListener("scroll", evaluateScroll, { passive: true });
    window.addEventListener("resize", evaluateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", evaluateScroll);
      window.removeEventListener("resize", evaluateScroll);
    };
  }, [evaluateScroll]);

  const handleJumpToTop = useCallback(() => {
    setDialogDismissed(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showDialog = scrollState.isAtBottomOfLongPage && !dialogDismissed;

  return (
    <div className="fixed right-6 bottom-6 z-220 flex items-center gap-3 pointer-events-none">
      {/* End-of-Page Suggestion Dialog */}
      <div
        role="dialog"
        aria-modal="false"
        aria-label="End of page navigation suggestion"
        data-testid="jump-top-dialog"
        className={`flex items-center gap-3 rounded-2xl border border-secondary/25 bg-primary-2/95 px-4 py-2.5 text-secondary backdrop-blur-md transition-all duration-300 ease-out ${
          showDialog
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-3 scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-accent-secondary">
            End of page reached
          </span>
          <button
            type="button"
            onClick={handleJumpToTop}
            className="text-left text-xs font-bold text-secondary underline decoration-accent-primary underline-offset-4 transition-colors hover:text-accent-secondary"
          >
            Jump back to top?
          </button>
        </div>

        <button
          type="button"
          onClick={() => setDialogDismissed(true)}
          aria-label="Dismiss suggestion"
          className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-xs text-secondary-5 transition-colors hover:bg-secondary/10 hover:text-secondary"
        >
          &#10005;
        </button>
      </div>

      {/* Rounded, Shadow-Free Floating Button with Animated Upward Arrow */}
      <button
        type="button"
        onClick={handleJumpToTop}
        aria-label="Jump to top"
        data-testid="jump-top-button"
        className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-secondary/30 bg-accent-primary text-primary transition-all duration-300 ease-out hover:scale-105 hover:border-accent-secondary hover:bg-accent-secondary active:scale-95 ${
          scrollState.isVisible
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-4 scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5 animate-bounce transition-transform duration-300 group-hover:-translate-y-0.5"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </div>
  );
}