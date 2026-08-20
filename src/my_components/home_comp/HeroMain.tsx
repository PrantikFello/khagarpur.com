"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { type CSSProperties } from "react";
import InfiniteImageSlider from "@/my_components/InfiniteImageCarouselAuto/ImageSliderFunction";
import dynamic from "next/dynamic";
import { useImageSlider } from "./queries";

const LaserFlow = dynamic(() => import("@/components/LaserFlow"), {
  ssr: false,
});

type HeroStyle = CSSProperties & {
  "--glow": string;
  "--border-glow": string;
};

export default function Hero() {
  const { data, isLoading } = useImageSlider();
  const imageUrls = data?.imageUrls ?? [];

  return (
    <div className="snap_div relative flex w-screen flex-col items-center justify-center overflow-x-visible">
      {/* Main content */}
      <HeroTextBox />

      {/* Image slider */}
      <div className="-translate-y-50 w-screen md:-translate-y-1/2">
        {!isLoading && imageUrls.length > 0 && (
          <InfiniteImageSlider
            images={imageUrls}
            width="clamp(100px,25vw,150px)"
            height="clamp(100px,25vw,150px)"
            reverse={false}
            duration={40}
          />
        )}
      </div>
    </div>
  );
}

export function HeroTextBox() {
  const pathname = usePathname();
  const colorLazer = "#4C00FF";

  const heroStyle: HeroStyle = {
    "--glow": colorLazer,
    "--border-glow": colorLazer,
  };

  return (
    <motion.div
      animate={{ y: [0, 20, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="snap_div relative z-60 -translate-y-1/6 flex w-full flex-col items-center overflow-x-visible bg-transparent"
    >
      {/* Laser */}
      <div className="z-500 h-[40vh] min-w-75 w-[60vw] bg-transparent">
        <LaserFlow
          key={pathname}
          horizontalBeamOffset={0.1}
          verticalBeamOffset={-0.5}
          horizontalSizing={0.4}
          verticalSizing={5}
          wispDensity={1.4}
          wispSpeed={10}
          wispIntensity={8}
          flowSpeed={0.2}
          flowStrength={0.5}
          fogIntensity={0.35}
          fogScale={0.3}
          fogFallSpeed={1.2}
          decay={3}
          falloffStart={1.5}
          color={colorLazer}
        />
      </div>

      {/* Hero box */}
      <div
        style={heroStyle}
        className="relative flex h-min min-w-[50vw] items-center justify-center overflow-visible rounded-lg border-2 border-(--border-glow) bg-primary-3 p-5 shadow-[0_0_30px_var(--glow),0_0_10px_var(--glow)]"
      >
        <div className="relative z-20 flex flex-col items-center text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-accent-secondary">
            Welcome to
          </p>

          <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-bold uppercase leading-none tracking-tight text-secondary">
            Khagarpur
          </h1>
        </div>
      </div>
    </motion.div>
  );
}


