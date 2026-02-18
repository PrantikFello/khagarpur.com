import { json } from "node:stream/consumers";
import "./hero_style.css";
import { Item } from "@radix-ui/themes/dist/cjs/components/radio-cards.js";
import heroData from "./hero.json";
export default function Hero_Section() {
	return <Hero_Root></Hero_Root>;
}
export function Hero_Root() {
	const hero_all: HeroItem[] = heroData.hero_data;

	return (
		<div className="flexing_column border_none">
			{hero_all.map((item, index) =>
				index % 2 === 0 ? (
					<Hero_Card_Opposite key={index} bold_string={item.hero_bold} paragraph={item.hero_paragraph} image_link={item.image_link} />
				) : (
					<Hero_Card key={index} bold_string={item.hero_bold} paragraph={item.hero_paragraph} image_link={item.image_link} />
				),
			)}
		</div>
	);
}

export function Hero_Card(props: any) {
	return (
		<div className="flexing_column hero_single">
			<div className="flexing_adaptive hero_individual flexing_reverse">
				<div className="flexing_column hero_text_div">
					<h1 className="hero_h1">{props.bold_string}</h1>
					<p className="hero_p">{props.paragraph}</p>
				</div>
				<div className="border_none flexing_adaptive hero_img_div">
					<img src={props.image_link}></img>
				</div>
			</div>
		</div>
	);
}

export function Hero_Card_Opposite(props: any) {
	return (
		<div className="flexing_column hero_single">
			<div className="flexing_adaptive hero_individual">
				<div className="flexing_column hero_text_div">
					<h1 className="hero_h1">{props.bold_string}</h1>
					<p className="hero_p">{props.paragraph}</p>
				</div>
				<div className="border_none flexing_adaptive hero_img_div">
					<img src={props.image_link}></img>
				</div>
			</div>
		</div>
	);
}

type HeroItem = {
	hero_bold: string;
	hero_paragraph: string;
	image_link: string;
};
