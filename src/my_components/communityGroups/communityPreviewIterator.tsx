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
  } = useOrganizations();

  if (isPending) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-secondary-5">
        <p>Loading communities...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-red-500">
        <p>Error: {error?.message || "Failed to load communities"}</p>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="snap_div flex items-center justify-center p-8 text-secondary-5">
        <p>No communities found.</p>
      </div>
    );
  }

  return (
    <section className="snap_div flex min-h-[100svh] w-full flex-wrap items-center justify-center gap-6 p-5">
      {communities.map((community) => (
        <CommunityPreviewCard key={community.id} {...community} />
      ))}
    </section>
  );
}