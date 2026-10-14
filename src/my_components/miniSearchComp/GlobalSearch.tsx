"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useMiniSearchIndex } from "./useMiniSearchIndex";
import SearchResultList from "./SearchResultList";
import type { SelectedSearchResult } from "./search_types";
import { useUnifiedSearchData } from "./useUnifiedSearchData";

export default function GlobalSearch() {
  const { unifiedDataset, isDataLoading } = useUnifiedSearchData();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMiniSearchIndex(unifiedDataset, query);

  // Smoothly decelerate gradient rotation when open (0.25x = 14s/rev) vs closed (1x = 3.5s/rev) with 0deg phase snap
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targetRate = isOpen ? 0.25 : 1;
    for (const anim of el.getAnimations({ subtree: true })) {
      if (anim instanceof CSSAnimation && anim.animationName === "border-spin") {
        anim.updatePlaybackRate(targetRate);
      }
    }
  }, [isOpen]);

  // Hardware / DOM Event Handlers
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    function handleTriggerSearch(event: Event) {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        setQuery(customEvent.detail);
        setIsOpen(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }

    window.addEventListener("trigger-global-search", handleTriggerSearch);
    return () => window.removeEventListener("trigger-global-search", handleTriggerSearch);
  }, []);

  const handleSelect = (item: SelectedSearchResult) => {
    setIsOpen(false);

    // 1. Business / Service Navigation
    if (item.type === "service") {
      if (pathname === "/Businesses") {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      router.push(item.href);
      return;
    }

    // 2. Staff Navigation
    if (item.type === "staff") {
      const [routePath] = item.href.split("#");
      if (pathname === routePath) {
        const el = document.getElementById(item.targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          return;
        }
      }
      router.push(item.href);
      return;
    }

    // 3. Community Navigation
    router.push(item.href);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed m-5 z-200 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        top-4 right-4
        lg:top-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2
        ${isOpen ? "w-[calc(100vw-2rem)] sm:w-[500px] lg:w-[600px]" : "w-12 h-12"}
      `}
    >
      {/* Isolated stacking context without overflow-hidden so outward blur is never clipped */}
      <div className="relative isolate">
        {/* Layer 1: Outward dissipating blur aura (-inset-2.5 = 10px spread, blur-xl = 24px Gaussian kernel) */}
        <div
          aria-hidden="true"
          className={`bg-animated-border pointer-events-none absolute -inset-2.5 -z-10 blur-xl opacity-80 transition-all duration-300 ${
            isOpen ? "rounded-[calc(var(--radius-2xl)+10px)]" : "rounded-full"
          }`}
        />

        {/* Layer 2: Crisp 3px animated gradient border (-inset-[3px] with concentric +3px outer corner radius) */}
        <div
          aria-hidden="true"
          className={`bg-animated-border pointer-events-none absolute -inset-[3px] -z-10 transition-all duration-300 ${
            isOpen ? "rounded-[calc(var(--radius-2xl)+3px)]" : "rounded-full"
          }`}
        />

        {/* Layer 3: Solid inner surface */}
        <div
          className={`relative flex items-center bg-primary text-secondary shadow-xl transition-all duration-300 ${
            isOpen
              ? "rounded-2xl p-2.5"
              : "rounded-full p-0 h-12 w-12 hover:scale-105 active:scale-95 cursor-pointer justify-center"
          }`}
        >
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Close search" : "Open search"}
            className={`flex items-center justify-center rounded-full text-secondary-5 hover:text-secondary transition-colors ${
              isOpen ? "p-2 hover:bg-primary-4" : "w-full h-full"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              )}
            </svg>
          </button>

          <div
            className={`flex-1 overflow-hidden transition-all duration-300 ${
              isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 pointer-events-none"
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isDataLoading}
              placeholder={isDataLoading ? "Loading search index..." : "Search people, shop, staff, services..."}
              className="w-full bg-transparent text-sm sm:text-base placeholder:text-secondary-5 outline-none text-secondary"
            />
          </div>

          {isOpen && query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="px-2 py-1 text-xs font-medium text-secondary-5 hover:text-secondary"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {isOpen && query.trim().length > 0 && (
        <SearchResultList results={results} query={query} onSelect={handleSelect} />
      )}
    </div>
  );
}