import Card_Basic from "@/my_components/service_card/service_card";
import data from "./card_data.json";
import Service_Card_Iterator from "@/my_components/service_card/service_card_iterator";
export default function Services() {
	return (
		<div>
			<Service_Card_Iterator></Service_Card_Iterator>
		</div>
	);
}
