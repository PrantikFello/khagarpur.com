import { Link_Prefix } from "@/lib/links";
import { useQuery } from "@tanstack/react-query";
import { HomeCardsResponse } from "./HomeCards";

export interface ImageSliderResponse {
  imageUrls: string[];
}

// Fetcher for Home Cards
const fetchHomeCards = async (): Promise<HomeCardsResponse> => {
  const res = await fetch(`${Link_Prefix}/homepage/data/homeCards.json`);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
};

export function useHomeCards() {
  return useQuery({
    queryKey: ["homeCards"],
    queryFn: fetchHomeCards,
  });
}

// Fetcher for Image Slider Carousel
const fetchImageSlider = async (): Promise<ImageSliderResponse> => {
  const res = await fetch(`${Link_Prefix}/homepage/data/imageSliderHome.json`);
  if (!res.ok) {
    throw new Error(`HTTP error! status ${res.status}`);
  }
  return res.json();
};

export function useImageSlider() {
  return useQuery({
    queryKey: ["imageSlider"],
    queryFn: fetchImageSlider,
  });
}