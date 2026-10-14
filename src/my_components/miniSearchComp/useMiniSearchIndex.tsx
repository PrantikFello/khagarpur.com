
import MiniSearch, { type SearchResult } from "minisearch";
import type { UnifiedSearchItem } from "./search_types";
import { useMemo } from "react";

export function useMiniSearchIndex(unifiedDataset: UnifiedSearchItem[], query: string) {
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

  const results = useMemo<SearchResult[]>(() => {
    const cleanQuery = query.trim();
    if (!cleanQuery || unifiedDataset.length === 0) return [];
    return miniSearch.search(cleanQuery);
  }, [query, miniSearch, unifiedDataset]);

  return results;
}