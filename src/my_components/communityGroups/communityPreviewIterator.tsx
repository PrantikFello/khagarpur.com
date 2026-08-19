"use client";

import { useOrganizations } from "@/my_components/communityGroups/organozationsDAL";
import CommunityPreviewCard from "./communityPreviewCard";

export default function CommunityPreviewIterator() {
  const { data: communities = [], isPending, isError, error } = useOrganizations();

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <p>Loading communities...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 text-destructive">
        <p>Error: {error?.message || "Failed to load communities"}</p>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        <p>No communities found.</p>
      </div>
    );
  }

  return (
    <section className="w-full p-5 flex flex-wrap items-stretch justify-center gap-4">
      {communities.map((community) => (
        <CommunityPreviewCard
          key={community.id}
          {...community}
        />
      ))}
    </section>
  );
}