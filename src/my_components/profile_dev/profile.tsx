import SocialLinks from "../socialMedia/socialMedia";
import { SocialPlatform } from "../socialMedia/socialMediaType";


export default function DevProfile() {
  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 shadow-sm transition-transform duration-300 hover:scale-[1.01]">
        <div className="flex flex-col gap-4 flex-1 text-center sm:text-left">
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {/* Hello, I am the developer and admin of this website. */}
            <br />
            {/* My core stack includes: */}
            <br />
            <span className="font-semibold text-black dark:text-white">
              {/* Spring Boot, Jetpack Compose, Next.js */}
            </span>
          </p>

          <div className="flex justify-center sm:justify-start">
            <DevSocialMedia/>
          </div>
        </div>

        <div className="relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden border-2 border-neutral-300 dark:border-neutral-700 shadow-inner">
          <img
            src="https://github.com/PrantikFello.png?size=200"
            alt="Profile Picture"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
const devSocialMedia :SocialPlatform[] = [
            {
              platform: "youtube",
              url: "https://github.com/PrantikFello/fifty-feed/releases/latest/download/fifty-feed.apk"
            },
            {
              platform: "github",
              url: "https://github.com/PrantikFello"
            }
          ];
export function DevSocialMedia(){
  return(
     <SocialLinks links={devSocialMedia} />
  );
}