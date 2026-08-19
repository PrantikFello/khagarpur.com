"use client";

import dynamic from "next/dynamic";
import InfiniteImageSlider from "@/my_components/InfiniteImageCarouselAuto/ImageSliderFunction"
const Grainient = dynamic(() => import("@/components/Grainient"), {
  ssr: false,
});
export default function HomeImageCarousel() {
	return (
		<div>
			{/* Grainient background */}
			<section className="relative h-min overflow-hidden" >
				<div className="absolute inset-0 overflow-hidden h-min">
					<Grainient
						color1="#000000"
						color2="#787878"
						color3="#ffffff"
						timeSpeed={0.8}
						colorBalance={0}
						warpStrength={1}
						warpFrequency={5}
						warpSpeed={2}
						warpAmplitude={50}
						blendAngle={0}
						blendSoftness={0.51}
						rotationAmount={500}
						noiseScale={2}
						grainAmount={0.1}
						grainScale={2}
						grainAnimated={false}
						contrast={1.5}
						gamma={1}
						saturation={1}
						centerX={0.22}
						centerY={0}
						zoom={1.2}
					/>
				</div>
				<div>
					<InfiniteImageSlider
						width="clamp(180px,30vw,350px)"
						height="clamp(180px,30vw,350px)"
						reverse={true}
						duration={20}
					/>
				</div>
			</section >
		</div>
	);
}