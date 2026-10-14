import { Link_Prefix } from "@/lib/links";
import type { SearchResult } from "minisearch";
import type { SelectedSearchResult } from "./search_types";

interface SearchResultListProps {
  results: SearchResult[];
  query: string;
  onSelect: (item: SelectedSearchResult) => void;
}

export default function SearchResultList({ results, query, onSelect }: SearchResultListProps) {
  return (
    <div className="mt-2 max-h-96 w-full overflow-y-auto rounded-2xl border border-primary-6 bg-primary-1 p-2 shadow-2xl animate-in fade-in slide-from-top-2 duration-200">
      {results.length > 0 ? (
        <ul className="divide-y divide-primary-6">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => onSelect(item)}
              className="group flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary-4"
            >
              {item.image ? (
                <img
                  src={`${item.type === "service" ? "" : Link_Prefix}${item.image}`}
                  alt={item.title}
                  className={`h-10 w-10 shrink-0 object-cover bg-primary-5 ${
                    item.type === "staff" ? "rounded-full" : "rounded-lg"
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
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium shrink-0 ${
                        item.type === "service"
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
                <p className="mt-0.5 line-clamp-2 text-xs text-secondary-5">{item.description}</p>
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
  );
}