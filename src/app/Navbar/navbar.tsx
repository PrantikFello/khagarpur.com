import Link from "next/link";
import Image from "next/image";

interface NavRoute {
  readonly label: string;
  readonly href: string;
}

const NAV_ROUTES: readonly NavRoute[] = [
  { label: "Home", href: "/Home" },
  { label: "Businesses", href: "/Businesses" },
  { label: "Community", href: "/Community" },
  { label: "About", href: "/About" },
] as const;

export default function Navbar() {
  return (
    <header className="w-full shrink-0 snap-start flex flex-col sm:flex-row items-center justify-between bg-linear-to-b from-primary-6 to-primary p-[--adaptive-padding]">
      {/* Brand / Logo */}
      <div className="flex items-center justify-center flex-row">
        <Image
          src="/knowledge.svg"
          alt="Knowledge Logo"
          width={64}
          height={64}
          className="h-[clamp(3rem,5vw,5rem)] w-[clamp(3rem,5vw,5rem)] p-2"
          priority
        />
        <h1 className="p-2 text-lg text-balance font-bold">Khagarpur</h1>
      </div>

      {/* Navigation Links */}
      <nav
        aria-label="Primary Navigation"
        className="flex items-center justify-center pt-2.5 sm:mr-12 sm:pt-0"
      >
        {NAV_ROUTES.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="mx-[clamp(2px,1px+1vw,15px)] rounded px-2 py-1 font-semibold text-secondary transition-colors duration-150 hover:bg-accent-secondary/20 hover:text-secondary-5 max-sm:font-normal"
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}