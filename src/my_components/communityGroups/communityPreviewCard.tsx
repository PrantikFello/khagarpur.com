// communityPreviewCard.tsx
import Link from "next/link";
import SafeImage from "@/lib/safeImage";
import type { CommunityStruct } from "./communityType";

export default function CommunityPreviewCard({
  id,
  groupName,
  message,
  profilePhoto,
  svgLink,
  groupContact,
  staffInfo,
}: Readonly<CommunityStruct>) {
  const cleanTitle = groupName?.trim() || "Unnamed Group";
  const cleanMessage = message?.trim();
  const address = groupContact?.address?.trim();
  const staffCount = Array.isArray(staffInfo) ? staffInfo.length : 0;
  const targetHref = `/Community/${encodeURIComponent(id)}`;

  return (
    <article className="group relative flex w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border-2 border-secondary bg-primary-1 shadow-[6px_6px_0_theme(colors.secondary.DEFAULT)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[10px_10px_0_theme(colors.accent.primary)]">
      {/* Banner Media */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-accent-secondary/15 border-b-2 border-secondary">
        <SafeImage
          src={profilePhoto}
          alt={cleanTitle}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating SVG Emblem Badge */}
        {svgLink && (
          <div className="absolute bottom-3 left-4 z-10 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-secondary bg-primary-1 p-1.5 shadow-[3px_3px_0_theme(colors.secondary.DEFAULT)]">
            <div className="relative h-full w-full">
              <SafeImage
                src={svgLink}
                alt={`${cleanTitle} emblem`}
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {/* Staff Count Pill */}
        {staffCount > 0 && (
          <span className="absolute top-3 right-3 z-10 rounded-full border-2 border-secondary bg-accent-primary px-3 py-1 text-xs font-bold text-primary shadow-[2px_2px_0_theme(colors.secondary.DEFAULT)]">
            {staffCount} {staffCount === 1 ? "Member" : "Members"}
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5 pt-4">
        <div className="space-y-2 text-left">
          <h3
            title={cleanTitle}
            className="line-clamp-1 text-lg font-extrabold tracking-tight text-secondary transition-colors duration-200 group-hover:text-accent-primary"
          >
            {cleanTitle}
          </h3>

          {cleanMessage ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-secondary-3">
              {cleanMessage}
            </p>
          ) : (
            <p className="text-xs italic text-secondary-3/60">
              Community organization directory listing
            </p>
          )}

          {address && (
            <p className="line-clamp-1 pt-1 text-xs font-medium text-secondary-4">
              📍 {address}
            </p>
          )}
        </div>

        {/* Footer CTA Button - Theme-aligned Brutalist Style */}
        <div className="mt-6 pt-2">
          <Link
            href={targetHref}
            className="appearance-none inline-flex items-center justify-center align-middle touch-manipulation select-none w-full px-[24px] py-[10px] rounded-none bg-accent-primary border-2 border-secondary text-primary text-[15px] font-semibold leading-[1.2] italic font-sans whitespace-nowrap transition-all duration-[120ms] [transition-timing-function:cubic-bezier(0.34,_1.56,_0.64,_1)] cursor-[pointer] motion-reduce:transition-none shadow-[4px_4px_0_theme(colors.secondary.DEFAULT)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_theme(colors.secondary.DEFAULT)] focus-visible:outline-[2px] focus-visible:outline-offset-[3px] focus-visible:outline-secondary after:absolute after:inset-0 after:z-20 after:content-['']"
          >
            <span>Visit Page</span>
            <svg
              aria-hidden="true"
              className="ml-2 h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}