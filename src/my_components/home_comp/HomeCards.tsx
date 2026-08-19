import { Link_Prefix } from '@/lib/links';
import React from 'react';

export interface HomeCardItem {
  title: string;
  description: string;
  call_to_action: string;
  link: string;
  image: string;
}

export interface HomeCardsResponse {
  home_cards: HomeCardItem[];
}

export interface HomeCardProps {
  title: string;
  description: string;
  callToAction: string;
  link: string;
  imageSrc: string;
  reverse?: boolean;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  title,
  description,
  callToAction,
  link,
  imageSrc,
  reverse = false,
}) => {
  return (
    <article
      className={`snap_div flex w-full flex-col-reverse items-center justify-evenly gap-8 py-10 sm:flex-row ${
        reverse ? 'sm:flex-row-reverse' : ''
      }`}
    >
      <div className="w-full sm:w-[50%]">
        <img
          src={imageSrc}
          alt={title}
          className="h-64 w-full rounded-2xl object-cover shadow-md transition duration-300 hover:scale-[1.01] sm:h-80"
          loading="lazy"
        />
      </div>

      <div className="flex w-full flex-col justify-center items sm:w-[45%]">
        <h2 className="text-[clamp(1.5rem,2vw,2.25rem)] font-bold tracking-tight text-secondary">
          {title}
        </h2>
        <p className="mt-3 text-[clamp(0.95rem,1.1vw,1.25rem)] leading-relaxed text-secondary/80">
          {description}
        </p>
        <a
          href={link}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg border border-accent-primary px-5 py-2.5 font-semibold text-secondary transition hover:bg-accent-primary hover:text-white"
        >
          {callToAction}
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </article>
  );
};

export default async function HomeCardSection() {
  let cards: HomeCardItem[] = [];

  try {
    const res = await fetch(`${Link_Prefix}/homepage/data/homeCards.json`, {
      cache: 'no-store', // or standard revalidation config if using Next.js data cache
    });
    
    if (res.ok) {
      const data: HomeCardsResponse = await res.json();
      cards = data.home_cards || [];
    }
  } catch (error) {
    console.error("Failed to fetch home cards JSON:", error);
  }

//   const imagePrefix = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-12">
        {cards.map((card, index) => (
          <HomeCard
            key={card.title}
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