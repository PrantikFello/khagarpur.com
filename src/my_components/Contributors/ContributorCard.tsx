import SocialLinks from "../socialMedia/socialMedia";
import { Contributor } from "./contributor_types";


interface ContributorCardProps {
  contributor: Contributor;
}

const FALLBACK_AVATAR = "https://github.com/ghost.png?size=200";

export default function ContributorCard({ contributor }: ContributorCardProps) {
  // O(1) direct string check; prevents empty src="" from triggering a redundant page reload request
  const avatarSrc =
    contributor.picture && contributor.picture.trim() !== ""
      ? contributor.picture
      : FALLBACK_AVATAR;

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border-2 border-primary-7 bg-primary-3 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
        <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-secondary-5">
              {contributor.name}
            </h3>
            <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Role:{" "}
              <span className="font-semibold text-secondary-2">
                {contributor.role}
              </span>
            </p>
            {contributor.phn && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {contributor.phn}
              </p>
            )}
          </div>

          {contributor.socialMedia && contributor.socialMedia.length > 0 && (
            <div className="pt-1 flex justify-center sm:justify-start">
              <SocialLinks links={contributor.socialMedia} />
            </div>
          )}
        </div>

        <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-inner">
          <img
            src={avatarSrc}
            alt={`${contributor.name}'s Profile Picture`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}