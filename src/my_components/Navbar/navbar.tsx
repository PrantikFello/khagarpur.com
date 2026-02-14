import Link from "next/link";
import { One, Two } from "../gradient_buttons/gradient_button";

import "./navbar_style.css";
export default function Navbar() {
	return (
		<div className="navbar_topbar">
			<div className="logo_div">
				<img src={"knowledge.svg"}></img>
			</div>
			<div className="nav_plus_buttons">
				<div className="nav_super">
					<nav>
						{/*<Link href="/">Home</Link>*/}
						<a href="/Home">Home</a>
						<a href="/Services">Services</a>
						<a href="/Contact">Contact</a>
						<a href="/About">About</a>
					</nav>
				</div>
				<div className="buttons_div">
					<One></One> <Two></Two>
				</div>
			</div>
		</div>
	);
}
