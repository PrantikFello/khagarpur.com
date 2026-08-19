import { CommunitiesJson } from "@/lib/links";
import { ServiceCardData } from "@/my_components/businesses/service_card_types";
import { CommunityStruct } from "@/my_components/communityGroups/communityType";
import { useQuery } from "@tanstack/react-query";

const fetchOrganizationsJson = async (): Promise<CommunityStruct[]> => {
    const res = await fetch(`${CommunitiesJson}`);
    if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json();
};

export function useOrganizations() {
    return useQuery({
        queryKey: ['organisations'],
        queryFn: fetchOrganizationsJson,
    });
}