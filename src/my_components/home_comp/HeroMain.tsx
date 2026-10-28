"use client";

import { motion } from "motion/react";
import InfiniteImageSlider from "@/my_components/InfiniteImageCarouselAuto/ImageSliderFunction";
import { useImageSlider } from "./queries";

export default function Hero() {
  const { data, isLoading } = useImageSlider();
  const imageUrls = data?.imageUrls ?? [];

  return (
    <section
      data-testid="hero-section"
      className="snap_div box-pattern relative flex h-[100svh] w-full flex-col items-center justify-evenly overflow-hidden px-4 py-6 sm:py-10"
    >
      {/* Ambient radial glow anchored behind the focal stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[50svh] w-[75vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-primary/15 blur-[90px]"
      />

      {/* Upper Focal Stack: Status Pill + Brutalist Hero Plaque */}
      <HeroTextBox />

      {/* Elevated Image Carousel Slot */}
      <div
        data-testid="hero-slider-slot"
        className="relative z-30 flex w-full shrink-0 flex-col items-center justify-center pb-4 sm:pb-6"
      >
        {!isLoading && imageUrls.length > 0 && (
          <InfiniteImageSlider
            images={imageUrls}
            width="clamp(95px, 18vh, 145px)"
            height="clamp(95px, 18vh, 145px)"
            reverse={false}
            duration={40}
          />
        )}
      </div>
    </section>
  );
}

export function HeroTextBox() {
  return (
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative z-20 flex w-full shrink-0 flex-col items-center justify-center"
    >
      {/* Compact Status Badge */}
      <div className="mb-4 inline-flex items-center gap-2 border-2 border-secondary bg-primary-2 px-3.5 py-1 shadow-[4px_4px_0_var(--color-secondary-4)] sm:mb-5">
        <span className="h-2 w-2 animate-pulse rounded-full bg-accent-secondary" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-secondary-2 sm:text-xs">
          Community &amp; Directory Portal
        </span>
      </div>

      {/* Animated Conic Border Wrapper */}
      <div className="bg-animated-border relative w-full max-w-2xl p-[2px] shadow-[8px_8px_0_var(--color-secondary-4)] sm:w-auto sm:min-w-[48vw]">
        {/* Resized Inner Plaque */}
        <div className="relative flex flex-col items-center justify-center bg-primary-3 px-6 py-6 text-center sm:px-12 sm:py-9">
          {/* Corner Hardware Ticks */}
          <span
            aria-hidden="true"
            className="absolute top-2 left-2 h-2 w-2 border-t-2 border-l-2 border-accent-secondary"
          />
          <span
            aria-hidden="true"
            className="absolute top-2 right-2 h-2 w-2 border-t-2 border-r-2 border-accent-secondary"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-2 left-2 h-2 w-2 border-b-2 border-l-2 border-accent-secondary"
          />
          <span
            aria-hidden="true"
            className="absolute right-2 bottom-2 h-2 w-2 border-r-2 border-b-2 border-accent-secondary"
          />

          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-accent-secondary">
            Welcome to
          </p>

          <h1 className="text-[clamp(2.25rem,6.5vw,5.5rem)] font-black italic uppercase leading-none tracking-tight text-secondary">
            Khagarpur
          </h1>

          <div className="mt-4 h-1 w-20 bg-accent-primary" />
        </div>
      </div>
    </motion.div>
  );
}