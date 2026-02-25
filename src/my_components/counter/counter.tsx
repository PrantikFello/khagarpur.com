"use client";

import { useCounterStore } from "@/store/useStore";

export default function Counter() {
	const count = useCounterStore((state) => state.count);
	const increment = useCounterStore((state) => state.increment);
	const decrement = useCounterStore((state) => state.decrement);
	const incrementAsync = useCounterStore((state) => state.incrementAsync);
	return (
		<div>
			<h1>Count: {count}</h1>
			<button type="submit" onClick={decrement}>
				-
			</button>
			<button type="reset" onClick={increment}>
				+
			</button>
			<button type="button" onClick={incrementAsync}>
				2
			</button>
		</div>
	);
}
