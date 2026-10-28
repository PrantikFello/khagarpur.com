"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Link_Prefix } from "@/lib/links";
import { useHomeCards } from "./queries";

export interface HomeCardItem {
  readonly title: string;
  readonly description: string;
  readonly call_to_action: string;
  readonly link: string;
  readonly image: string;
}

export interface HomeCardsResponse {
  readonly home_cards: readonly HomeCardItem[];
}

export interface HomeCardProps {
  readonly title: string;
  readonly description: string;
  readonly callToAction: string;
  readonly link: string;
  readonly imageSrc: string;
  readonly reverse?: boolean;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  description,
  callToAction,
  link,
  imageSrc,
  reverse = false,
}) => {
  const isExternal = link.startsWith("http://") || link.startsWith("https://");

  const actionContent = (
    <>
      <span>{callToAction}</span>
      <span
        aria-hidden="true"
        className="font-bold not-italic transition-transform duration-120 group-hover/cta:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );

  const buttonClasses =
    "group/cta inline-flex w-fit select-none items-center justify-center gap-3 rounded-none border-2 border-secondary bg-accent-primary px-7 py-3 font-sans text-[16px] font-semibold italic tracking-normal text-primary shadow-[6px_6px_0_var(--color-secondary)] transition-all duration-[120ms] [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none hover:bg-accent-secondary active:translate-x-[6px] active:translate-y-[6px] active:shadow-[0_0_var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-secondary";

// Inside HomeCards.tsx — replace the return of HomeCard (lines 56-103) with:
  return (
    <div className="snap_div flex items-center justify-center py-8">
      <article
        data-testid="home-card-article"
        className={`relative flex w-full flex-col-reverse items-center justify-between gap-8 rounded-none border-2 border-secondary bg-transparent backdrop-blur-sm p-6 text-secondary shadow-[8px_8px_0_var(--color-secondary-4)] transition-colors duration-200 sm:p-10 ${
          reverse ? "sm:flex-row-reverse" : "sm:flex-row"
        }`}
      >
        {/* Media Frame with transparent background */}
        <div className="relative w-full shrink-0 sm:w-1/2">
          <div className="relative h-64 w-full overflow-hidden rounded-none border-2 border-secondary bg-transparent shadow-[6px_6px_0_var(--color-secondary-4)] sm:h-80">
            <Image
              src={imageSrc}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="rounded-none object-cover transition-transform duration-200 ease-out hover:scale-[1.02]"
              priority={false}
            />
          </div>
        </div>

        {/* Content Block */}
        <div className="flex w-full flex-col justify-center sm:w-[45%]">
          <h2 className="text-[clamp(1.5rem,2.2vw,2.5rem)] font-black italic uppercase tracking-tight text-secondary">
            {title}
          </h2>
          <p className="mt-4 border-l-2 border-secondary pl-4 text-[clamp(1rem,1.1vw,1.15rem)] font-medium leading-relaxed text-secondary-3">
            {description}
          </p>

          <div className="mt-8">
            {isExternal ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
              >
                {actionContent}
              </a>
            ) : (
              <Link href={link} className={buttonClasses}>
                {actionContent}
              </Link>
            )}
          </div>
        </div>
      </article>
    </div>
  ); 
};

export const HomeCardSkeleton: React.FC = () => {
  return (
    <div className="snap_div flex items-center justify-center py-8">
      <div
        data-testid="home-card-skeleton"
        className="relative flex w-full animate-pulse flex-col-reverse gap-8 border-2 border-secondary bg-transparent backdrop-blur-sm p-6 shadow-[8px_8px_0_var(--color-secondary-4)] sm:flex-row sm:p-10"
      >
        <div className="h-64 w-full border-2 border-secondary bg-secondary/10 shadow-[6px_6px_0_var(--color-secondary-4)] sm:h-80 sm:w-1/2" />
        <div className="flex w-full flex-col justify-center gap-4 sm:w-[45%]">
          <div className="h-8 w-3/4 border-2 border-secondary bg-secondary/10" />
          <div className="h-20 w-full border-l-2 border-secondary pl-4">
            <div className="h-full w-full bg-secondary/5" />
          </div>
          <div className="mt-4 h-12 w-40 border-2 border-secondary bg-secondary/10 shadow-[4px_4px_0_var(--color-secondary-4)]" />
        </div>
      </div>
    </div>
  );
};

export default function HomeCardSection() {
  const { data, isLoading, isError, refetch } = useHomeCards();

  if (isLoading) {
    return (
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <HomeCardSkeleton />
          <HomeCardSkeleton />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        {cards.map((card, index) => (
          <HomeCard
            key={`${card.title}-${card.link}-${index}`}
            title={card.title}
            description={card.description}
            callToAction={card.call_to_action}
            link={card.link}
            imageSrc={`${Link_Prefix}${card.image}`}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
  }

  const cards: readonly HomeCardItem[] = data?.home_cards ?? [];

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        {cards.map((card, index) => (
          <HomeCard
            key={`${card.title}-${card.link}-${index}`}
            title={card.title}
            description={card.description}
            callToAction={card.call_to_action}
            link={card.link}
            imageSrc={`${Link_Prefix}${card.image}`}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
}