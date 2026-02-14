import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/themes/dist/cjs/index.js";
import "./styles.css";

export default function () {
	<div>
		<Accordion.Root type="single" collapsible>
			<Accordion.Item value="item-1">
				Atom An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of
				all components subscribed to that atom:
			</Accordion.Item>
			<Accordion.Item value="item-2">
				Atom An atom represents a piece of state. Atoms can be read from and written to from any component. Components that read the value of an atom are implicitly subscribed to that atom, so any atom updates will result in a re-render of
				all components subscribed to that atom:
			</Accordion.Item>
		</Accordion.Root>
	</div>;
}
