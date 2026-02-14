import Contact_Card from "./contact_card";
import "./card_containers.css";
export default function Contact() {
	return (
		<div className="grid_super">
			<div className="flexing_iterations" style={{ gap: 10 }}>
				<Contact_Card></Contact_Card>

				<Contact_Card></Contact_Card>

				<Contact_Card></Contact_Card>

				<Contact_Card></Contact_Card>
				<Contact_Card></Contact_Card>

				<Contact_Card></Contact_Card>
				<Contact_Card></Contact_Card>

				<Contact_Card></Contact_Card>
			</div>
		</div>
	);
}
