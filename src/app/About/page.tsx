"use client";

import DevProfile from "@/my_components/profile_dev/profile";

import { motion } from "motion/react";
import ContributorsIterator from "@/my_components/Contributors/ContributorIterator";

export default function About() {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: false, amount: 0.3 }}
			transition={{ duration: 1, ease: "easeInOut" }}

			className="min-h-screen px-20 flex items-center flex-col"
		>
			
			
		<h3 className="m-5 font-bold text-xl">BTS:</h3>


			<ContributorsIterator></ContributorsIterator>
		</motion.div>
	);
}

