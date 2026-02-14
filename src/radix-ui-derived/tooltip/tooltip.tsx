import "./tooltip.css";
import { Tooltip } from "radix-ui";
export function My_tooltip() {
	return (
		<Tooltip.Provider delayDuration={400} skipDelayDuration={300}>
			<Tooltip.Root>
				<Tooltip.Trigger style={{ padding: 0, margin: 0 }}>
					<button>tooltip</button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<div className="borders_none ">
						<p>
							Next.js does not automatically block cross-origin requests during development, but will block by default in a future major version of Next.js to prevent unauthorized requesting of internal assets/endpoints that are available
							in development mode.
						</p>
					</div>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}
