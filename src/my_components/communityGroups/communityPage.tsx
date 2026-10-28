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

export default function CommunityPage({ data }: { data: CommunityStruct }) {
  if (!data) return null;

  const validImages = Array.isArray(data.imageUrls)
    ? data.imageUrls.filter(Boolean)
    : [];
  const staffList = Array.isArray(data.staffInfo) ? data.staffInfo : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      {/* 1. Hero Section */}
      <section className="snap_div relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden p-4 text-center">
        {data.profilePhoto && (
          <SafeImage
            src={data.profilePhoto}
            alt={data.groupName || "Community Banner"}
            fill
            sizes="100vw"
            className="absolute inset-0 z-10 h-full w-full object-cover object-center"
          />
        )}

        <div className="relative z-20 mx-auto flex max-w-2xl flex-col items-center justify-center rounded-xl bg-primary/60 p-6 backdrop-blur-xs">
          <h1 className="text-2xl font-bold tracking-tight text-secondary md:text-5xl">
            {data.groupName || "Community"}
          </h1>
          {data.message && (
            <p className="mt-2 text-base text-secondary-2 md:text-lg">
              {data.message}
            </p>
          )}
        </div>
      </section>

      {/* 2. Info & Contact Section */}
      <section className="snap_div flex min-h-[100svh] w-full flex-col items-center justify-evenly gap-6 p-6 md:flex-row md:gap-[clamp(10px,5vw,60px)]">
        {data.svgLink && (
          <div className="relative h-[clamp(150px,35vw,420px)] w-[clamp(150px,35vw,420px)] shrink-0 overflow-hidden rounded-2xl">
            <SafeImage
              src={data.svgLink}
              alt={data.groupName || "Community logo"}
              fill
              sizes="(max-width: 768px) 60vw, 35vw"
              className="object-contain"
            />
          </div>
        )}
        {data.groupContact && <ContactInfo contact={data.groupContact} />}
      </section>

      {/* 3. Media Carousel */}
      {validImages.length > 0 && (
        <section className="snap_div flex min-h-[100svh] w-full items-center justify-center overflow-hidden py-6">
          <InfiniteImageSlider
            images={validImages}
            width="clamp(200px, 40vw, 500px)"
            height="clamp(200px, 40vw, 500px)"
            duration={50}
          />
        </section>
      )}

      {/* 4. Staff Section */}
      {staffList.length > 0 && (
        <section className="snap_div flex min-h-[100svh] w-full flex-col items-center justify-center p-6">
          <h2 className="mb-6 max-w-4xl text-center text-2xl font-bold text-secondary">
            Our Team
          </h2>
          <div className="mb-12 flex max-w-7xl flex-wrap justify-center gap-6">
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

export function ContactInfo({ contact }: { contact: CommunityContact }) {
  if (!contact) return null;
  const quickDials: QuickDials[] = Array.isArray(contact.quickDials)
    ? contact.quickDials
    : [];
  const socialMedia = Array.isArray(contact.socialMedia)
    ? contact.socialMedia
    : [];

  return (
    <article className="flex h-fit w-full max-w-md min-w-[280px] flex-col rounded-xl border border-secondary-6 bg-primary-3 p-6 text-secondary shadow-md">
      <h3 className="mb-4 border-b border-secondary-6 pb-2 text-lg font-semibold">
        Public Contact Details
      </h3>

      <div className="flex flex-col gap-4">
        {quickDials.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-medium opacity-80">Phone:</span>
            <div className="flex flex-row flex-wrap gap-3">
              {quickDials.map((dial, index) => (
                <div key={`${dial.phoneNo}-${index}`} className="flex flex-col">
                  {dial.serviceName && (
                    <span className="text-xs font-semibold text-secondary">
                      {dial.serviceName}
                    </span>
                  )}
                  <a
                    href={`tel:${dial.phoneNo}`}
                    className="font-mono text-sm text-link-text hover:underline"
                  >
                    {dial.phoneNo}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {contact.emailId && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-80">Email:</span>
            <a
              href={`mailto:${contact.emailId}`}
              className="text-sm text-link-text hover:underline"
            >
              {contact.emailId}
            </a>
          </div>
        )}

        {contact.officeHours && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-80">Office Hours:</span>
            <span className="text-sm text-secondary-3">
              {contact.officeHours}
            </span>
          </div>
        )}

        {contact.address && (
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium opacity-80">Location:</span>
            <address className="text-sm not-italic text-secondary-3">
              {contact.address}
            </address>
          </div>
        )}

        {socialMedia.length > 0 && (
          <div className="border-t border-secondary-6 pt-3">
            <SocialLinks links={socialMedia} />
          </div>
        )}
      </div>
    </article>
  );
}

export function StaffCard({ staff }: { staff: StaffMember }) {
  const slug =
    staff.staffName?.toLowerCase().replace(/\s+/g, "-") || "member";
  const phoneNos = Array.isArray(staff.contactInfo?.phoneNos)
    ? staff.contactInfo.phoneNos
    : [];
  const primaryPhone = phoneNos[0];
  const socialMedia = Array.isArray(staff.contactInfo?.socialMedia)
    ? staff.contactInfo.socialMedia
    : [];

  return (
    <div
      id={`staff-${slug}`}
      className="flex w-full max-w-[280px] min-w-[240px] flex-col items-center rounded-xl border border-secondary-5 bg-primary-1 p-5 text-center shadow-sm"
    >
      <div className="relative mb-3 h-[clamp(60px,15vw,100px)] w-[clamp(60px,15vw,100px)] shrink-0 overflow-hidden rounded-full border border-secondary-4 bg-accent-secondary/20">
        <SafeImage
          src={staff.photoUrl}
          alt={`${staff.staffName || "Staff"}'s profile`}
          fill
          sizes="100px"
          fallbackSrc="/placeholders/avatar.webp"
          className="object-cover"
        />
      </div>

      <h4 className="text-base font-bold text-secondary">
        {staff.staffName || "Unnamed Staff"}
      </h4>
      <p className="mt-0.5 text-xs text-secondary-5">
        {staff.designation || ""}
      </p>

      {(primaryPhone ||
        staff.contactInfo?.emailId ||
        socialMedia.length > 0) && (
        <div className="mt-3 flex w-full flex-col items-center gap-1.5 border-t border-secondary-6 pt-3">
          {primaryPhone && (
            <a
              href={`tel:${primaryPhone}`}
              className="font-mono text-xs text-secondary hover:underline"
            >
              {primaryPhone}
            </a>
          )}
          {staff.contactInfo?.emailId && (
            <a
              href={`mailto:${staff.contactInfo.emailId}`}
              className="break-all text-xs text-link-text hover:underline"
            >
              {staff.contactInfo.emailId}
            </a>
          )}
          {socialMedia.length > 0 && (
            <div className="mt-1">
              <SocialLinks links={socialMedia} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}