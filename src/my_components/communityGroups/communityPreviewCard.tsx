// communityPreviewCard.tsx
import Link from "next/link";
import SafeImage from "@/lib/safeImage";
import type { CommunityStruct } from "./communityType";

export default function CommunityPreviewCard({
  id,
  groupName,
  message,
  profilePhoto,
}: CommunityStruct) {
  return (
    <article className="flex w-full max-w-[380px] flex-col gap-4 overflow-hidden rounded-2xl border border-secondary-6 bg-primary-1 transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative h-48 w-full bg-accent-secondary/20">
        <SafeImage
          src={profilePhoto}
          alt={groupName || "Community group"}
          fill
          sizes="(max-width: 768px) 100vw, 380px"
          className="object-cover"
        />
      </div>

      <div className="flex w-full grow flex-col items-center justify-center p-4">
        <h3 className="text-center text-lg font-bold text-secondary">
          {groupName || "Unnamed Group"}
        </h3>
        {message && (
          <p className="mt-2 text-center text-sm text-secondary-3">{message}</p>
        )}
      </div>

      <div className="flex justify-center p-4 pt-0">
        <Link
          href={`/Community/${id}`}
          className="rounded-md bg-accent-primary px-4 py-2 font-semibold text-primary transition-opacity hover:opacity-90"
        >
          Visit Page
        </Link>
      </div>
    </article>
  );
}