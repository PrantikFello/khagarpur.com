// organozationsDAL.tsx
import { CommunitiesJson } from "@/lib/links";
import type { CommunityStruct } from "@/my_components/communityGroups/communityType";
import { useQuery } from "@tanstack/react-query";

const ORGANIZATIONS_QUERY_KEY = ["organisations"] as const;

const fetchOrganizationsJson = async (): Promise<CommunityStruct[]> => {
  const res = await fetch(`${CommunitiesJson}`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
};

export function useOrganizations() {
  return useQuery({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: fetchOrganizationsJson,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCommunityById(id: string) {
  return useQuery({
    queryKey: ORGANIZATIONS_QUERY_KEY,
    queryFn: fetchOrganizationsJson,
    staleTime: 1000 * 60 * 5,
    select: (communities) =>
      communities.find((c) => String(c.id) === String(id)),
  });
}