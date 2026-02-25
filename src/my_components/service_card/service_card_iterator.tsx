import Service_Card from "./service_card";
import type { ServiceCardData } from "./service_card_types";

import providers_json from "./service_providers.json";

const providers: ServiceCardData[] = providers_json as ServiceCardData[];
export default function Service_Card_Iterator() {
	return (
		<div className="flexing_iterations" style={{ gap: 15 }}>
			{providers.map((provider) => (
				<Service_Card
					key={provider.service_id}
					service_id={provider.service_id}
					name={provider.name}
					description={provider.description}
					relevance_tags={provider.relevance_tags ?? []}
					specifics={provider.specifics ?? []}
					image={provider.image}
					website={provider.website}
					service_area={provider.service_area ?? []}
					phone={provider.phone ?? []}
				/>
			))}
		</div>
	);
}
