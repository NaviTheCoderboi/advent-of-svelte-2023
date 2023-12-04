interface RawChild {
	name: string;
	tally: number;
}

interface Child extends RawChild {
	character: string;
}

export type { Child, RawChild };
