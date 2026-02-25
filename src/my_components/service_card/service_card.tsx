import { ServiceCardData } from "./service_card_types";
import "./service_card_styles.css";

export default function Service_Card(provider: ServiceCardData) {
	return (
		<div className="service_root border_none rounded_border">
			<div className="service_img_div flexing_adaptive">
				<img src={provider.image} alt={provider.name}></img>
			</div>
			<div className="service_texts rounded_border">
				<p className="name">{provider.name}</p>
				<p className="description">{provider.description}</p>
				<SpecificServices services={provider.specifics ?? []}></SpecificServices>
				<ServiceArea areas={provider.service_area}></ServiceArea>
				<RelevantTags tags={provider.relevance_tags}></RelevantTags>
				<PhoneNums phone={provider.phone}></PhoneNums>
				<div></div>
			</div>
		</div>
	);
}

export function RelevantTags({ tags }: { tags: string[] }) {
	return (
		<div className="flexing_iterations iter_text border_none">
			<p className="item_category">Similar : </p>
			{tags.map((tag) => (
				<a key={tag} href="{tag}" className="list_items">
					{tag}
				</a>
			))}
		</div>
	);
}

export function SpecificServices({ services }: { services: string[] }) {
	return (
		<div className="flexing_iterations iter_text border_none">
			<p className="item_category">Services : </p>
			{services.map((service) => (
				<p key={service} className="list_items">
					{service}
				</p>
			))}
		</div>
	);
}

export function ServiceArea({ areas }: { areas: string[] }) {
	return (
		<div className="flexing_iterations iter_text border_none">
			<p className="item_category">Areas : </p>
			{areas.map((area) => (
				<p key={area} className="list_items">
					{area}
				</p>
			))}
		</div>
	);
}

export function PhoneNums({ phone }: { phone: string[] }) {
	return (
		<div className="flexing_iterations iter_text border_none">
			<p className="item_category">Phone : </p>
			{phone.map((phn) => (
				<a key={phn} href="tel:{phn}" className="list_items phn">
					{phn}
				</a>
			))}
		</div>
	);
}
