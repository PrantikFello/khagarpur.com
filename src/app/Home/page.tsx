import Hero_Section from "@/my_components/hero_section/hero";
import HELLO from "@/my_components/section_head/hello";
export default function Home() {
	return (
		<div className="flexing_column">
			<HELLO></HELLO>
			<div className="flexing_column">
				<Hero_Section></Hero_Section>
			</div>
		</div>
	);
}
