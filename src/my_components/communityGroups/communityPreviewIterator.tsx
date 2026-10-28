// communityPreviewIterator.tsx
"use client";

import { useOrganizations } from "@/my_components/communityGroups/organozationsDAL";
import CommunityPreviewCard from "./communityPreviewCard";

export default function CommunityPreviewIterator() {
  const {
    data: communities = [],
    isPending,
    isError,
    error,
    refetch,
  } = useOrganizations();

  if (isPending) {
    return (
      <section
        aria-busy="true"
        aria-label="Loading communities"
        className="snap_div mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 place-items-start justify-items-start gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex h-[360px] w-full max-w-[380px] animate-pulse flex-col overflow-hidden rounded-2xl border border-secondary-6/60 bg-primary-1"
          >
            <div className="h-48 w-full bg-secondary-6/30" />
            <div className="flex flex-1 flex-col justify-between p-5">
              <div className="space-y-3">
                <div className="h-5 w-2/3 rounded bg-secondary-6/40" />
                <div className="h-3.5 w-full rounded bg-secondary-6/30" />
                <div className="h-3.5 w-4/5 rounded bg-secondary-6/30" />
              </div>
              <div className="h-10 w-full rounded-xl bg-secondary-6/40" />
            </div>
          </div>
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div className="snap_div flex min-h-[100svh] flex-col items-start justify-start gap-4 p-8">
        <div className="max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-left">
          <p className="text-base font-semibold text-red-500">
            Unable to load communities
          </p>
          <p className="mt-1 text-xs text-secondary-4">
            {error?.message || "Check your connection and try again."}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="appearance-none inline-flex items-center justify-center align-middle touch-manipulation select-none px-[24px] py-[8px] rounded-none bg-[#e82ca9] border-2 border-[#181713] text-[#181713] text-[14px] font-semibold leading-[1.2] italic font-sans whitespace-nowrap transition-all duration-[120ms] [transition-timing-function:cubic-bezier(0.34,_1.56,_0.64,_1)] cursor-[pointer] motion-reduce:transition-none shadow-[4px_4px_0_#181713] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_#181713] mt-4"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="snap_div flex min-h-[100svh] items-start justify-start p-8 text-secondary-4">
        <p className="rounded-xl border border-secondary-6 bg-primary-2 px-6 py-4 text-sm">
          No community groups registered yet.
        </p>
      </div>
    );
  }

  return (
    <section className="snap_div mx-auto flex min-h-[100svh] w-full max-w-7xl items-start justify-start p-6 py-12">
      <div className="grid w-full grid-cols-1 place-items-start justify-items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <CommunityPreviewCard key={community.id} {...community} />
        ))}
      </div>
    </section>
  );
}