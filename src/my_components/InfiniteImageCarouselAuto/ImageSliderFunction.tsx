"use client";

import { Link_Prefix } from "@/lib/links";
import "./ImageSlider.css";
import type { CSSProperties } from "react";

type InfiniteImageSliderProps = {
  images?: string[];
  width?: number | string;
  height?: number | string;
  reverse?: boolean;
  duration?: number;
  className?: string;
};

type SliderStyle = CSSProperties & {
  "--width": string;
  "--height": string;
  "--quantity": number;
  "--duration": string;
};

export default function InfiniteImageSlider({
  images = [],
  width = "120px",
  height = "60px",
  reverse = false,
  duration = 10,
  className = "",
}: InfiniteImageSliderProps) {
  const quantity = images?.length || 0;

  if (!quantity) return null;

  // Normalize numeric dimensions to px values
  const formattedWidth = typeof width === "number" ? `${width}px` : width;
  const formattedHeight = typeof height === "number" ? `${height}px` : height;
  const containerClearancePadding = "64px";

  const sliderStyle: SliderStyle = {
    height: `calc(${formattedHeight} + ${containerClearancePadding})`,
    "--width": formattedWidth,
    "--height": formattedHeight,
    "--quantity": quantity,
    "--duration": `${duration}s`,
  };

  const prefix = Link_Prefix || "";

  return (
    <div
      className={`
        group/slider
        relative
        w-full
        overflow-x-clip
        overflow-y-visible
        mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        ${className}
      `}
      style={sliderStyle}
    >
      <div
        className="relative flex h-full w-full items-center"
        style={{
          minWidth: `calc(var(--width) * ${quantity})`,
        }}
      >
        {images.map((img, index) => {
          const position = index + 1;

          const animationDelay = `calc(
            (${duration}s / ${quantity}) *
            (${position} - 1) -
            ${duration}s
          )`;

          // Ensure proper path concatenation
          const imageSrc = img.startsWith("http")
            ? img
            : `${prefix}${img.startsWith("/") ? "" : "/"}${img}`;

          return (
            <div
              key={`${img}-${index}`}
              className={`
                absolute
                left-full
                top-1/2
                h-(--height)
                w-(--width)
                -translate-y-1/2
                rounded-md
                transition-all
                duration-300
                ease-in-out
                hover:z-30
                hover:scale-105
                group-hover/slider:grayscale
                hover:grayscale-0!
                ${reverse ? "animate-reversePlay" : "animate-autoRun"}
              `}
              style={{
                animationDelay,
              }}
            >
              <img
                src={imageSrc}
                alt={`Slider item ${position}`}
                loading="lazy"
                className="h-full w-full rounded-md object-cover select-none pointer-events-none"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}