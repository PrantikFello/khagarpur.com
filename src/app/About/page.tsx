"use client";

import DevProfile from "@/my_components/profile_dev/profile";
import MetaBalls from "@/components/MetaBalls"
import { motion } from "motion/react";

export default function About() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false, amount: 0.3 }}
			transition={{ duration: 1, ease: "easeInOut" }}

			className="min-h-screen"
		>
			<MetaBalls
				color="#7e7e7e"
				cursorBallColor="#7e7e7e"
				cursorBallSize={1}
				ballCount={16}
				animationSize={20}
				enableMouseInteraction={false}
				enableTransparency={true}
				hoverSmoothness={0.107}
				clumpFactor={1}
				speed={0.1}
			/>
			
			<DevProfile />
		</motion.div>
	);
}

