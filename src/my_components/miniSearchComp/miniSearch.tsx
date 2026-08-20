"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import MiniSearch, { type SearchResult } from "minisearch";
import type { ServiceCardData } from "../businesses/service_card_types";
import type { CommunityStruct } from "../communityGroups/communityType";
import { Link_Prefix } from "@/lib/links";
import { useBusinesses } from "@/my_components/businesses/businnessesDAL";
import { useOrganizations } from "@/my_components/communityGroups/organozationsDAL";

// --- TYPE DEFINITIONS ---
interface UnifiedSearchItem {
  id: string;
  targetId: string;
  type: "service" | "community" | "staff";
  title: string;
  description: string;
  searchableContent: string;
  image?: string;
  badge: string;
  href: string;
}

export default function GlobalSearch() {
  // 1. Ingest Data directly from TanStack Query Hooks
  const { data: businesses = [], isLoading: isBusinessesLoading } = useBusinesses();
  const { data: communities = [], isLoading: isCommunitiesLoading } = useOrganizations();

  const isDataLoading = isBusinessesLoading || isCommunitiesLoading;

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Unify and Normalize Dataset
  const unifiedDataset = useMemo<UnifiedSearchItem[]>(() => {
    if (!businesses.length && !communities.length) return [];

    const providerItems: UnifiedSearchItem[] = (businesses as ServiceCardData[]).map((p) => ({
      id: `svc_${p.service_id}`,
      targetId: p.service_id,
      type: "service",
      title: p.name,
      description: p.description,
      searchableContent: [
        p.name,
        p.description,
        ...(p.relevance_tags || []),
        ...(p.specifics || []),
        ...(p.service_area || []),
      ].join(" "),
      image: p.image,
      badge: "Business",
      href: `/Businesses/#${p.service_id}`,
    }));

    const communityItems: UnifiedSearchItem[] = (communities as CommunityStruct[]).map((c) => ({
      id: `com_${c.id}`,
      targetId: c.id,
      type: "community",
      title: c.groupName,
      description: c.message,
      searchableContent: [c.groupName, c.message, c.groupContact?.address || ""].join(" "),
      image: c.profilePhoto,
      badge: "Community",
      href: `/Community/${c.id}`,
    }));

    const staffItems: UnifiedSearchItem[] = (communities as CommunityStruct[]).flatMap((c) =>
      (c.staffInfo || []).map((s, index) => {
        const slug = s.staffName.toLowerCase().replace(/\s+/g, "-");
        const staffAnchorId = `staff-${slug}`;

        return {
          id: `staff_${c.id}_${slug}_${index}`,
          targetId: staffAnchorId,
          type: "staff",
          title: s.staffName,
          description: `${s.designation} • ${c.groupName}`,
          searchableContent: `${s.staffName} ${s.designation} ${c.groupName} ${c.groupContact?.address || ""}`,
          image: s.photoUrl,
          badge: "Staff",
          href: `/Community/${c.id}#${staffAnchorId}`,
        };
      })
    );

    return [...providerItems, ...communityItems, ...staffItems];
  }, [businesses, communities]);

  // 3. Build Inverted MiniSearch Index (Rebuilds only when unified data changes)
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<UnifiedSearchItem>({
      idField: "id",
      fields: ["title", "description", "searchableContent"],
      storeFields: ["targetId", "type", "title", "description", "image", "badge", "href"],
      searchOptions: {
        boost: { title: 3, description: 1.5, searchableContent: 2 },
        fuzzy: 0.2,
        prefix: true,
      },
    });

    if (unifiedDataset.length > 0) {
      ms.addAll(unifiedDataset);
    }
    return ms;
  }, [unifiedDataset]);

  // 4. Compute Search Results Reactively
  const results = useMemo<SearchResult[]>(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery || unifiedDataset.length === 0) return [];
    return miniSearch.search(cleanQuery);
  }, [query, miniSearch, unifiedDataset]);

  // 5. Hardware / DOM Event Handlers
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

  const handleSelect = (item: UnifiedSearchItem | SearchResult) => {
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
      // Pass item.href directly without leading template slash
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
      className={`fixed z-[200] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        top-4 right-4
        lg:top-6 lg:right-auto lg:left-1/2 lg:-translate-x-1/2
        ${isOpen ? "w-[calc(100vw-2rem)] sm:w-[500px] lg:w-[600px]" : "w-12 h-12"}
      `}
    >
      <div
        className={`relative flex items-center bg-primary text-secondary border border-primary-6 shadow-xl transition-all duration-300 ${isOpen
            ? "rounded-2xl p-2.5"
            : "rounded-full p-0 h-12 w-12 hover:scale-105 active:scale-95 cursor-pointer justify-center"
          }`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close search" : "Open search"}
          className={`flex items-center justify-center rounded-full text-secondary-5 hover:text-secondary transition-colors ${isOpen ? "p-2 hover:bg-primary-4" : "w-full h-full"
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
          className={`flex-1 overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100 ml-2" : "opacity-0 w-0 pointer-events-none"
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

      {isOpen && query.trim().length > 0 && (
        <div className="mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-primary-6 bg-primary-1 p-2 shadow-2xl animate-in fade-in slide-from-top-2 duration-200">
          {results.length > 0 ? (
            <ul className="divide-y divide-primary-6">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary-4"
                >
                  {item.image ? (
                    <img
                      src={`${item.type === "service" ? "" : Link_Prefix}${item.image}`}
                      alt={item.title}
                      className={`h-10 w-10 shrink-0 object-cover bg-primary-5 ${item.type === "staff" ? "rounded-full" : "rounded-lg"
                        }`}
                    />
                  ) : (
                    <div className="h-10 w-10 shrink-0 rounded-lg bg-primary-5 flex items-center justify-center text-[10px] text-secondary-5">
                      N/A
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <h4 className="truncate text-sm font-semibold text-secondary group-hover:text-accent-primary">
                          {item.title}
                        </h4>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[10px] font-medium shrink-0 ${item.type === "service"
                              ? "bg-accent-secondary/20 text-accent-secondary"
                              : item.type === "staff"
                                ? "bg-accent-primary/20 text-accent-primary"
                                : "bg-link-text/20 text-link-text"
                            }`}
                        >
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-secondary-5">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-6 text-center text-xs text-secondary-5">
              No results found for &quot;{query}&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}