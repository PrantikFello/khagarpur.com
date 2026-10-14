import { useMemo } from "react";
import type { ServiceCardData } from "../businesses/service_card_types";
import type { CommunityStruct } from "../communityGroups/communityType";
import { useBusinesses } from "@/my_components/businesses/businnessesDAL";
import { useOrganizations } from "@/my_components/communityGroups/organozationsDAL";
import type { UnifiedSearchItem } from "./search_types";

export function useUnifiedSearchData() {
  const { data: businesses = [], isLoading: isBusinessesLoading } = useBusinesses();
  const { data: communities = [], isLoading: isCommunitiesLoading } = useOrganizations();

  const isDataLoading = isBusinessesLoading || isCommunitiesLoading;

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
          description: `${s.designation}\n${c.groupName}`,
          searchableContent: `${s.staffName} ${s.designation} ${c.groupName} ${c.groupContact?.address || ""}`,
          image: s.photoUrl,
          badge: "Staff",
          href: `/Community/${c.id}#${staffAnchorId}`,
        };
      })
    );

    return [...providerItems, ...communityItems, ...staffItems];
  }, [businesses, communities]);

  return { unifiedDataset, isDataLoading };
}