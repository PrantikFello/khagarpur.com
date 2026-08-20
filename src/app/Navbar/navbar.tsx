import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
	return (
		<header  className="sticky top-0 z-100 flex w-full items-center justify-between bg-linear-to-b from-primary-6 to-primary p-[--adaptive-padding] flex-col sm:flex-row">
			{/* Brand / Logo */}
			<div className="flex items-center justify-center flex-row">
				<Image
					src="/knowledge.svg"
					alt="Knowledge Logo"
					width={30}
					height={30}
					className="h-[clamp(3rem,5vw,5rem)] w-[clamp(3rem,5vw,5rem)] p-2"
					priority
				/>
				<h1 className="p-2 text-lg text-balance font-bold">Khagarpur</h1>
			</div>

			{/* Navigation Links */}
			<div className="flex flex-col-reverse items-center justify-between sm:flex-row sm:justify-center">
				<nav className="z-[110] flex items-center justify-center pt-2.5 sm:mr-12 sm:pt-0">
					<Link
						href="/Home"
						className="mx-[clamp(2px,1px+1vw,15px)] font-semibold text-secondary hover:bg-accent-secondary/20 hover:text-secondary-5 transition-colors duration-150 rounded px-2 py-1 max-sm:font-normal"
					>
						Home
					</Link>
					<Link
						href="/Businesses"
						className="mx-[clamp(2px,1px+1vw,15px)] font-semibold text-secondary hover:bg-accent-secondary/20 hover:text-secondary-5 transition-colors duration-150 rounded px-2 py-1 max-sm:font-normal"
					>
						Businesses
					</Link>
					<Link
						href="/Community"
						className="mx-[clamp(2px,1px+1vw,15px)] font-semibold text-secondary hover:bg-accent-secondary/20 hover:text-secondary-5 transition-colors duration-150 rounded px-2 py-1 max-sm:font-normal"
					>
						Community
					</Link>
					<Link
						href="/About"
						className="mx-[clamp(2px,1px+1vw,15px)] font-semibold text-secondary hover:bg-accent-secondary/20 hover:text-secondary-5 transition-colors duration-150 rounded px-2 py-1 max-sm:font-normal"
					>
						About
					</Link>
				</nav>
			</div>
		</header>
	);
}