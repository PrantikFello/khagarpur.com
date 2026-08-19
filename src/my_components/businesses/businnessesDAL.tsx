'use client';

import { BusinessesJson } from "@/lib/links";
import { ServiceCardData } from "@/my_components/businesses/service_card_types";
import { useQuery } from "@tanstack/react-query";

const fetchBusinessesJson = async (): Promise<ServiceCardData[]> => {
    const res = await fetch(`${BusinessesJson}`);
    if(!res.ok){
        throw new Error(`Request failed with status ${res.status}`);
    }
    return res.json()
}

export function useBusinesses(){
    return useQuery({
        queryKey:['businesses'],
        queryFn: fetchBusinessesJson,
    })
}