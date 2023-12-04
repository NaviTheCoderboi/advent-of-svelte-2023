import type { Child } from './types';

const pageize = (data: Child[], pageSize: number): Child[][] => {
	const pages = new Array<Child[]>();
	for (let i = 0; i < data.length; i += pageSize) {
		pages.push(data.slice(i, i + pageSize));
	}
	return pages;
};

export { pageize };
