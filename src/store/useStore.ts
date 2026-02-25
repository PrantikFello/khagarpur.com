import { create } from "zustand";
import { persist } from "zustand/middleware";

type CounterStore = {
	count: number;
	increment: () => void;
	decrement: () => void;
	incrementAsync: () => Promise<void>;
};

export const useCounterStore = create<CounterStore>()(
	persist(
		(set) => ({
			count: 0,

			increment: () => {
				set((state) => ({
					count: state.count + 1,
				}));
			},
			decrement: () => {
				set((state) => ({
					count: state.count - 1,
				}));
			},
			incrementAsync: async () => {
				await new Promise((resolve) => setTimeout(resolve, 1000));
				set((state) => ({
					count: state.count + 2,
				}));
			},
		}),
		{
			name: "count-value",
		},
	),
);
