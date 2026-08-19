"use client";

import SocialLinks from "../socialMedia/socialMedia";

import InfiniteImageSlider from "../InfiniteImageCarouselAuto/ImageSliderFunction";
import { motion } from "motion/react";
import SafeImage from "@/lib/safeImage";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { CommunityContact, CommunityStruct, StaffMember } from "./communityType";

export default function CommunityPage({ data }: { data: CommunityStruct }) {
  if (!data) return null;

  const validImages = Array.isArray(data.imageUrls) ? data.imageUrls.filter(Boolean) : [];
  const staffList = Array.isArray(data.staffInfo) ? data.staffInfo : [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="snap_container w-full"
    >
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center w-full snap_div overflow-hidden min-h-[60vh] p-4">
        {data.profilePhoto && (
          <SafeImage
            src={data.profilePhoto}
            alt={data.groupName || "Community Banner"}
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center z-10"
          />
        )}

        <div className="relative z-20 flex flex-col justify-center items-center bg-primary/40 backdrop-blur-[2px] p-6 rounded-xl max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-5xl font-bold text-white tracking-tight">
            {data.groupName || 'Community'}
          </h1>
          {data.message && (
            <p className="mt-2 text-base md:text-lg text-white/90">
              {data.message}
            </p>
          )}
        </div>
      </section>

      {/* Info & Contact Section */}
      <section className="w-full flex flex-col md:flex-row gap-6 md:gap-[clamp(10px,5vw,60px)] items-center justify-evenly snap_div p-6">
        {data.svgLink && (
          <div className="relative h-[clamp(150px,40vw,500px)] w-[clamp(150px,40vw,500px)] rounded-2xl overflow-hidden">
            <SafeImage
              src={data.svgLink}
              alt={data.groupName || "Community logo"}
              fill
              sizes="40vw"
              className="object-contain"
            />
          </div>
        )}
        {data.groupContact && <ContactInfo contact={data.groupContact} />}
      </section>

      {/* Media Carousel */}
      {validImages.length > 0 && (
        <section className="snap_div flex justify-center items-center py-6">
          <InfiniteImageSlider
            images={validImages}
            width="clamp(200px, 40vw, 500px)"
            height="clamp(200px, 40vw, 500px)"
            duration={50}
          />
        </section>
      )}

      {/* Staff Section */}
      {staffList.length > 0 && (
        <section className="snap-start min-h-[calc(100vh-85px)] md:min-h-[calc(100vh-75px)] p-6 flex flex-col w-full justify-center items-center">
          <h2 className="text-2xl font-bold mb-6 text-center max-w-4xl">
            Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-7xl">
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
  const quickDials = Array.isArray(contact.quickDials) ? contact.quickDials : [];
  const socialMedia = Array.isArray(contact.socialMedia) ? contact.socialMedia : [];

  return (
    <article className="bg-primary-3 h-fit flex flex-col p-6 rounded-xl shadow-md min-w-[300px] max-w-md w-full">
      <h3 className="font-semibold text-lg border-b border-black/10 pb-2 mb-4">
        Public Contact Details
      </h3>

      <div className="flex flex-col gap-4">
        {quickDials.length > 0 && (
          <div className="flex flex-col gap-1.5">
            <span className="font-medium text-sm opacity-80">Phone:</span>
            <div className="flex flex-row gap-3 flex-wrap">
              {quickDials.map((dial: { phoneNo: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; serviceName: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: any) => (
                <div key={`${dial.phoneNo}-${index}`} className="flex flex-col">
                  {dial.serviceName && (
                    <span className="text-secondary text-xs font-semibold">
                      {dial.serviceName}
                    </span>
                  )}
                  <a
                    href={`tel:${dial.phoneNo}`}
                    className="text-blue-600 hover:underline text-sm font-mono"
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
            <span className="font-medium text-sm opacity-80">Email:</span>
            <a
              href={`mailto:${contact.emailId}`}
              className="text-blue-600 hover:underline text-sm"
            >
              {contact.emailId}
            </a>
          </div>
        )}

        {contact.address && (
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm opacity-80">Location:</span>
            <address className="not-italic text-sm text-gray-700">
              {contact.address}
            </address>
          </div>
        )}

        {socialMedia.length > 0 && (
          <div className="pt-3 border-t border-black/5">
            <SocialLinks links={socialMedia} />
          </div>
        )}
      </div>
    </article>
  );
}

export function StaffCard({ staff }: { staff: StaffMember }) {
  const slug = staff.staffName?.toLowerCase().replace(/\s+/g, "-") || "member";
  const phoneNos = Array.isArray(staff.contactInfo?.phoneNos) ? staff.contactInfo.phoneNos : [];
  const primaryPhone = phoneNos[0];
  const socialMedia = Array.isArray(staff.contactInfo?.socialMedia) ? staff.contactInfo.socialMedia : [];

  return (
    <div
      id={`staff-${slug}`}
      className="bg-primary-1 p-5 rounded-xl shadow-sm border border-secondary-5 flex flex-col items-center min-w-[250px] max-w-[280px] w-full text-center"
    >
      <div className="relative rounded-full mb-3 overflow-hidden bg-accent-secondary/20 h-[clamp(60px,15vw,100px)] w-[clamp(60px,15vw,100px)] shrink-0 border border-secondary-4">
        <SafeImage
          src={staff.photoUrl}
          alt={`${staff.staffName || 'Staff'}'s profile`}
          fill
          sizes="100px"
          fallbackSrc="/placeholders/avatar.webp"
          className="object-cover"
        />
      </div>

      <h4 className="font-bold text-base text-secondary">{staff.staffName || 'Unnamed Staff'}</h4>
      <p className="text-xs text-gray-600 mt-0.5">{staff.designation || ''}</p>

      {(primaryPhone || staff.contactInfo?.emailId || socialMedia.length > 0) && (
        <div className="mt-3 border-t border-secondary-6 pt-3 w-full flex flex-col items-center gap-1.5">
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
              className="text-xs text-blue-500 hover:underline break-all"
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