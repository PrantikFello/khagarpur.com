// app/Community/[id]/page.tsx
"use client";

import { use } from "react";
import CommunityPage from "@/my_components/communityGroups/communityPage"; //[cite: 1]
import { notFound } from "next/navigation"; //[cite: 1]
import { useCommunityById } from "@/my_components/communityGroups/organozationsDAL";

export default function DynamicCommunityRoute({
  params,
}: {
  params: Promise<{ id: string }>; //[cite: 1]
}) {
  const { id } = use(params);
  const { data: targetCommunity, isLoading, isError } = useCommunityById(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError || !targetCommunity) {
    return notFound(); //[cite: 1]
  }

  return <CommunityPage data={targetCommunity} />; //[cite: 1]
}