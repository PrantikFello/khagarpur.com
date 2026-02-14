import { My_tooltip } from "@/radix-ui-derived/tooltip/tooltip";
import "./contact_card.css";

export default function Contact_Card() {
	const name: string = "Find Herbs";
	const image_path: string = "herbs_and_spices.png";
	const services: string[] = ["extracted_oil", "plantation", "extracted oil", "plantation"];
	const active_hrs: string = "9:30AM to 6:00PM";
	const available: boolean = true;
	const contact_json = "fetch";
	return (
		// <div className="body_part">
		<div className="borders_none contact_card_ultimate">
			<div className="card_img_div">
				<img src={image_path}></img>
			</div>
			<div className="borders_none card_data_text">
				<p>{name}</p>
				<Iter_Links items={services}></Iter_Links>
				<div className="flexing_row activity">
					<p>
						Active Time : <br></br> {active_hrs}{" "}
					</p>
					<p>
						Now : <br></br> {available ? "ONLINE" : "OFFLINE"}
					</p>
				</div>
				<div className="flexing_row activity">
					<a>visit~ {name}</a>
					<My_tooltip></My_tooltip>
				</div>
			</div>
		</div>
		// </div>
	);
}

export function Iter_Links({ items }: { items: string[] }) {
	return (
		<div className="super_div">
			<div className="flexing_iterations tags">
				{items.map((item, index) => (
					<a className="iter_links" key={index} href={`/${item}`}>
						{item}
					</a>
				))}
			</div>
		</div>
	);
}
