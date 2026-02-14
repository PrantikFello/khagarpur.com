import "./hero_style.css";

export default function Hero_Section() {
	return <Hero_Card></Hero_Card>;
}
export function Hero_Card() {
	const bold_string = "Hello";
	const paragraph = "Flex-Basis Conflict: width: 100% and height: 100% on all flex utility classes will cause overflow if nested without parent constraints.";
	const image_link = "/knowledge.svg";
	return (
		<div className="flexing_column super_hero">
			<div className="borders_none flexing_adaptive">
				<div className="borders_none hero_divs">
					<h1 className="hero_h1">{bold_string}</h1>
					<p>{paragraph}</p>
				</div>
				<div className="borders_none hero_divs">
					<div>
						<img src={image_link} className="hero_img"></img>
					</div>
				</div>
			</div>
			<div className="hero_section_two"></div>
		</div>
	);
}
