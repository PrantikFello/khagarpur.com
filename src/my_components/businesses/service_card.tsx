'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import SocialLinks from '../socialMedia/socialMedia';
import SafeImage from '@/lib/safeImage';
import { ServiceCardData } from './service_card_types';
import { Link_Prefix } from '@/lib/links';

interface ServiceCardProps {
  provider: ServiceCardData;
}

export default function ServiceCard({ provider }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Collapse on mobile when the card scrolls out of view
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setExpanded(false);
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handleTagClick = (tag: string) => {
    window.dispatchEvent(
      new CustomEvent('trigger-global-search', { detail: tag })
    );
  };

  const uniquePhones = useMemo(() => {
    if (!Array.isArray(provider.phone)) return [];
    return Array.from(new Set(provider.phone.filter(Boolean)));
  }, [provider.phone]);

  return (
    <article
      ref={cardRef}
      id={provider.service_id}
      className="z-60 group scroll-mt-28 flex w-full max-w-md h-min flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted flex items-center justify-center">
        <img
          src={`${Link_Prefix}${provider.image}`}
          alt={provider.name || 'Service provider'}
          // fill
          sizes="(max-width: 768px) 100vw, 450px"
          className="object-cover transition-transform duration-500 group-hover:scale-105 h-min-[50px]"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-3 p-4 sm:gap-4 sm:p-5">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
            {provider.name}
          </h3>
          <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">
            {provider.description}
          </p>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setExpanded((curr) => !curr)}
          aria-expanded={expanded}
          aria-controls={`details-${provider.service_id}`}
          className="w-full rounded-md bg-secondary/10 px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/20 active:scale-[0.98] md:hidden"
        >
          {expanded ? 'Show less ↑' : 'Show details ↓'}
        </button>

        {/* Smooth Expandable Metadata Drawer using CSS Grid */}
        <div
          id={`details-${provider.service_id}`}
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] ${
            expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-2.5 pt-1 text-xs md:text-sm">
              <MetadataList
                title="Services"
                items={provider.specifics}
                onItemClick={handleTagClick}
              />
              <MetadataList
                title="Areas"
                items={provider.service_area}
                onItemClick={handleTagClick}
              />
              <MetadataList
                title="Similar"
                items={provider.relevance_tags}
                onItemClick={handleTagClick}
              />

              {provider.website?.trim() && (
                <div className="flex min-w-0 items-center gap-1.5 pt-1">
                  <span className="shrink-0 font-semibold text-muted-foreground">
                    Website:
                  </span>
                  <a
                    href={provider.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate text-primary underline hover:opacity-80"
                  >
                    {provider.website}
                  </a>
                </div>
              )}

              {uniquePhones.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="mr-0.5 font-semibold text-muted-foreground">
                    Phone:
                  </span>
                  {uniquePhones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone}`}
                      className="inline-flex items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/20 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              )}

              {provider.socialMedia && provider.socialMedia.length > 0 && (
                <div className="pt-1">
                  <SocialLinks links={provider.socialMedia} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface MetadataListProps {
  title: string;
  items?: string[];
  onItemClick?: (item: string) => void;
}

export function MetadataList({
  title,
  items = [],
  onItemClick,
}: MetadataListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="mr-0.5 font-semibold text-muted-foreground">{title}:</span>
      {items.map((item, index) => (
        <button
          type="button"
          key={`${item}-${index}`}
          onClick={() => onItemClick?.(item)}
          className="inline-flex cursor-pointer items-center rounded-md bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary-foreground transition-all hover:bg-secondary/20 active:scale-95"
        >
          {item}
        </button>
      ))}
    </div>
  );
}