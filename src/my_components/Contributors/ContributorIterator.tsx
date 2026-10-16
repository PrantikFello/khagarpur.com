import ContributorCard from "./ContributorCard";
import contributorsData from "./contributors.json";
import { Contributor } from "./contributor_types";

const contributors: Contributor[] = contributorsData as Contributor[];

export default function ContributorsIterator() {
  return (
    <div className="flex flex-col gap-4">
      {contributors.map((contributor, index) => (
        <ContributorCard 
          key={`${contributor.name}-${index}`} 
          contributor={contributor} 
        />
      ))}
    </div>
  );
}