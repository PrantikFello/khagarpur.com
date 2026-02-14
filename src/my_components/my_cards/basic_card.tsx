export default function Card_Basic(name: string, tags: string[], timing: string, now: boolean, image: string, website: string) {
	return (
		<div className="card_ultimate">
			<div className="card_image_div">
				<img src={image}></img>
			</div>
			<div className="card_texts">
				<div></div>
			</div>
		</div>
	);
}
