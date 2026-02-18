"use client";

import Counter from "@/my_components/counter/counter";

export default function About() {
	return <Counter></Counter>;
}
export function HomePage() {
	// const [count, setCount] = useRecoilState(counterState);
	// const user = useRecoilValue(userState);
	return (
		<div>
			{/*<h1>Home Page</h1>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>*/}
		</div>
	);
}
