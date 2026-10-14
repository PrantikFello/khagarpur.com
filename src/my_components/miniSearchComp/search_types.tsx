import type { SearchResult } from "minisearch";

export interface UnifiedSearchItem {
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

export type SelectedSearchResult = UnifiedSearchItem | SearchResult;