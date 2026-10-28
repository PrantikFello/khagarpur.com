// communityPage.tsx
"use client";

import SocialLinks from "@/my_components/socialMedia/socialMedia";
import InfiniteImageSlider from "@/my_components/InfiniteImageCarouselAuto/ImageSliderFunction";
import { motion } from "motion/react";
import SafeImage from "@/lib/safeImage";
import type {
  CommunityContact,
  CommunityStruct,
  QuickDials,
  StaffMember,
} from "./communityType";

export default function CommunityPage({
  data,
}: {
  readonly data: CommunityStruct;
}) {
  if (!data) return null;

  const validImages = Array.isArray(data.imageUrls)
    ? data.imageUrls.filter(Boolean)
    : [];
  const staffList = Array.isArray(data.staffInfo) ? data.staffInfo : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bg-primary text-secondary"
    >
      {/* 1. Immersive Hero Section */}
      <section className="relative flex min-h-[75vh] w-full flex-col items-center justify-center overflow-hidden p-6 text-center">
        {data.profilePhoto && (
          <SafeImage
            src={data.profilePhoto}
            alt={data.groupName || "Community Banner"}
            fill
            sizes="100vw"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center filter brightness-90"
          />
        )}
        {/* Theme-aware contrast gradient overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-primary/30 via-primary/70 to-primary"
        />

        <div className="relative z-20 mx-auto mt-16 flex max-w-4xl flex-col items-center justify-center rounded-3xl border-2 border-secondary bg-primary-1/90 p-8 shadow-[8px_8px_0_theme(colors.secondary.DEFAULT)] backdrop-blur-md sm:p-12">
          {data.svgLink && (
            <div className="relative mb-6 h-20 w-20 overflow-hidden rounded-2xl border-2 border-secondary bg-primary p-2.5 shadow-[4px_4px_0_theme(colors.secondary.DEFAULT)]">
              <SafeImage
                src={data.svgLink}
                alt={`${data.groupName} crest`}
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          )}
          <h1 className="text-3xl font-extrabold tracking-tight text-secondary sm:text-5xl md:text-6xl">
            {data.groupName || "Community Organization"}
          </h1>
          {data.message && (
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-secondary-3 md:text-lg">
              {data.message}
            </p>
          )}
        </div>
      </section>

      {/* 2. Info & Contact Section */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 py-20 lg:flex-row lg:items-start lg:justify-between">
        {data.svgLink && (
          <div className="relative flex w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-secondary bg-accent-secondary/10 p-8 shadow-[6px_6px_0_theme(colors.secondary.DEFAULT)]">
            <div className="relative h-[260px] w-full">
              <SafeImage
                src={data.svgLink}
                alt={data.groupName || "Community logo"}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-contain p-2"
              />
            </div>
            <div className="mt-6 text-center">
              <span className="inline-block rounded-full border border-secondary/40 bg-primary-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary-3">
                ..........
              </span>
            </div>
          </div>
        )}
        {data.groupContact && <ContactInfo contact={data.groupContact} />}
      </section>

      {/* 3. Media Gallery Carousel */}
      {validImages.length > 0 && (
        <section className="w-full border-y-2 border-secondary bg-primary-2/40 py-16">
          <div className="mx-auto max-w-7xl px-6 text-center mb-10">
            <h2 className="text-2xl font-extrabold tracking-tight text-secondary md:text-4xl">
              Community Highlights & Gallery
            </h2>
            <p className="mt-2 text-sm text-secondary-4">
              Explore snapshots and moments from our collective
            </p>
          </div>
          <InfiniteImageSlider
            images={validImages}
            width="clamp(260px, 35vw, 450px)"
            height="clamp(260px, 35vw, 450px)"
            duration={50}
          />
        </section>
      )}

      {/* 4. Staff Section */}
      {staffList.length > 0 && (
        <section className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-secondary md:text-4xl">
              Leadership & Team
            </h2>
            <p className="mt-2 text-sm font-medium text-secondary-4">
              Get in touch with our dedicated representatives
            </p>
          </div>
          <div className="grid w-full grid-cols-1 place-items-stretch justify-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staffList.map((staff, index) => (
              <StaffCard
                key={`${staff.staffName || "staff"}-${index}`}
                staff={staff}
              />
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}

export function ContactInfo({
  contact,
}: {
  readonly contact: CommunityContact;
}) {
  if (!contact) return null;
  const quickDials: QuickDials[] = Array.isArray(contact.quickDials)
    ? contact.quickDials
    : [];
  const socialMedia = Array.isArray(contact.socialMedia)
    ? contact.socialMedia
    : [];

  return (
    <article className="flex h-fit w-full max-w-xl flex-col rounded-3xl border-2 border-secondary bg-primary-1 p-8 text-secondary shadow-[8px_8px_0_theme(colors.secondary.DEFAULT)] sm:p-10">
      <h3 className="mb-6 border-b-2 border-secondary pb-4 text-2xl font-extrabold tracking-tight">
        Public Contact Information
      </h3>

      <dl className="flex flex-col gap-6">
        {quickDials.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <dt className="text-xs font-bold uppercase tracking-widest text-secondary-4">
              Quick Dial Numbers
            </dt>
            <dd className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {quickDials.map((dial, index) => (
                <a
                  key={`${dial.phoneNo}-${index}`}
                  href={`tel:${dial.phoneNo}`}
                  className="group flex flex-col rounded-xl border-2 border-secondary bg-primary-2 p-3.5 shadow-[3px_3px_0_theme(colors.secondary.DEFAULT)] transition-all hover:bg-accent-primary hover:text-primary"
                >
                  {dial.serviceName && (
                    <span className="text-xs font-bold opacity-90">
                      {dial.serviceName}
                    </span>
                  )}
                  <span className="mt-1 font-mono text-sm font-semibold tracking-wide">
                    {dial.phoneNo}
                  </span>
                </a>
              ))}
            </dd>
          </div>
        )}

        {contact.emailId && (
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-widest text-secondary-4">
              Email Address
            </dt>
            <dd>
              <a
                href={`mailto:${contact.emailId}`}
                className="inline-block break-all text-sm font-semibold text-link-text underline decoration-2 underline-offset-4 hover:opacity-85"
              >
                {contact.emailId}
              </a>
            </dd>
          </div>
        )}

        {contact.officeHours && (
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-widest text-secondary-4">
              Office Hours
            </dt>
            <dd className="text-sm font-medium text-secondary-2">
              {contact.officeHours}
            </dd>
          </div>
        )}

        {contact.address && (
          <div className="flex flex-col gap-1.5">
            <dt className="text-xs font-bold uppercase tracking-widest text-secondary-4">
              Location / Address
            </dt>
            <dd>
              <address className="text-sm font-medium leading-relaxed not-italic text-secondary-2">
                {contact.address}
              </address>
            </dd>
          </div>
        )}

        {socialMedia.length > 0 && (
          <div className="border-t-2 border-secondary pt-5">
            <SocialLinks links={socialMedia} />
          </div>
        )}
      </dl>
    </article>
  );
}

export function StaffCard({ staff }: { readonly staff: StaffMember }) {
  const slug =
    staff.staffName?.trim().toLowerCase().replace(/\s+/g, "-") || "member";
  const phoneNos = Array.isArray(staff.contactInfo?.phoneNos)
    ? staff.contactInfo.phoneNos.filter(Boolean)
    : [];
  const socialMedia = Array.isArray(staff.contactInfo?.socialMedia)
    ? staff.contactInfo.socialMedia
    : [];

  return (
    <div
      id={`staff-${slug}`}
      className="flex w-full max-w-[280px] flex-col items-center justify-between rounded-2xl border-2 border-secondary bg-primary-1 p-6 text-center shadow-[5px_5px_0_theme(colors.secondary.DEFAULT)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_theme(colors.accent.primary)]"
    >
      <div className="flex w-full flex-col items-center">
        <div className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-secondary bg-accent-secondary/20 shadow-[3px_3px_0_theme(colors.secondary.DEFAULT)]">
          <SafeImage
            src={staff.photoUrl}
            alt={`${staff.staffName || "Staff"}'s profile`}
            fill
            sizes="96px"
            fallbackSrc="/placeholders/avatar.webp"
            className="object-cover"
          />
        </div>

        <h4 className="line-clamp-1 text-base font-extrabold text-secondary">
          {staff.staffName || "Unnamed Staff"}
        </h4>
        {staff.designation && (
          <p className="mt-1 line-clamp-2 text-xs font-bold text-secondary-4">
            {staff.designation}
          </p>
        )}
      </div>

      {(phoneNos.length > 0 ||
        staff.contactInfo?.emailId ||
        socialMedia.length > 0) && (
        <div className="mt-5 flex w-full flex-col items-center gap-2 border-t-2 border-secondary/60 pt-4">
          {phoneNos.map((phone, idx) => (
            <a
              key={`${phone}-${idx}`}
              href={`tel:${phone}`}
              className="font-mono text-xs font-semibold text-secondary transition-colors hover:text-accent-primary hover:underline"
            >
              {phone}
            </a>
          ))}
          {staff.contactInfo?.emailId && (
            <a
              href={`mailto:${staff.contactInfo.emailId}`}
              className="line-clamp-1 break-all text-xs font-medium text-link-text hover:underline"
            >
              {staff.contactInfo.emailId}
            </a>
          )}
          {socialMedia.length > 0 && (
            <div className="mt-1.5">
              <SocialLinks links={socialMedia} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}