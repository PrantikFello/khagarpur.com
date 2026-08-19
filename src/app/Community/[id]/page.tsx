// app/Community/[id]/page.tsx
import CommunityPage from "@/my_components/communityGroups/communityPage";
import { CommunitiesJson } from "@/lib/links";
import type { CommunityStruct } from "@/my_components/communityGroups/communityType";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const res = await fetch(CommunitiesJson, {
      // Prevents caching stale data during incremental static builds
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const communities: CommunityStruct[] = await res.json();

    return communities.map((community) => ({
      id: String(community.id),
    }));
  } catch (error) {
    console.error("❌ Error inside generateStaticParams:", error);
    // In static export, an empty array will trigger route generation errors
    return [];
  }
}

export default async function DynamicCommunityRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await fetch(CommunitiesJson);
    const communities: CommunityStruct[] = await res.json();
    const targetCommunity = communities.find((c) => String(c.id) === id);

    if (!targetCommunity) {
      return notFound();
    }

    return <CommunityPage data={targetCommunity} />;
  } catch {
    return notFound();
  }
}