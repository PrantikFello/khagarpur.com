"use client";
import dynamic from "next/dynamic";

// Disable SSR for components using React Query, Canvas, WebGL, or DOM APIs
const Hero = dynamic(() => import("@/my_components/home_comp/HeroMain"), {
  ssr: false,
});

const HomeCardsIterator = dynamic(
  () => import("@/my_components/home_comp/HomeCards"),
  {
    ssr: false,
  }
);

export default function HomeMain() {
  return (
    <div className="w-full">
      <Hero />
      <HomeCardsIterator />
    </div>
  );
}