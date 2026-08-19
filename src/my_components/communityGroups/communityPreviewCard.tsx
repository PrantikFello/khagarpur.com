import Link from 'next/link';
import SafeImage from '@/lib/safeImage';
import { CommunityStruct } from './communityType';

export default function CommunityPreviewCard({ id, groupName, message, profilePhoto }: CommunityStruct) {
  return (
    <article className="w-[clamp(350px,10vw,550px)] gap-4 rounded-2xl border-secondary-6 border overflow-hidden bg-primary-1 transition-transform duration-500 hover:scale-102 flex flex-col">
      <div className="relative w-full h-48 bg-accent-secondary/60">
        <SafeImage
          src={profilePhoto}
          alt={groupName || 'Community group'}
          fill
          sizes="(max-width: 768px) 100vw, 450px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full p-4 grow">
        <h3 className="font-bold text-lg text-center">{groupName || 'Unnamed Group'}</h3>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </div>

      <div className="p-4 pt-0 flex justify-center">
        <Link
          href={`/Community/${id}`}
          className="bg-accent-primary text-secondary px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
        >
          Visit Page
        </Link>
      </div>
    </article>
  );
}