import type { Child, RawChild } from '$lib/utils/1/types';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const pageSize =
		url.searchParams.get('page_size') && Number(url.searchParams.get('page_size')) >= 8
			? Number(url.searchParams.get('page_size'))
			: 8;

	const fetched_children: Child[] = (
		(await (
			await fetch('https://advent.sveltesociety.dev/data/2023/day-one.json')
		).json()) as RawChild[]
	).map(({ name, tally }) => ({
		name: name,
		tally: tally,
		character: tally >= 0 ? 'Good' : 'Naughty'
	}));

	const added_children: Child[] = cookies.get('added_children')
		? (JSON.parse(cookies.get('added_children') as string) as RawChild[]).map(
				({ name, tally }) => ({
					name: name,
					tally: tally,
					character: tally >= 0 ? 'Good' : 'Naughty'
				})
		  )
		: [];
	return {
		allChildren: [...fetched_children, ...added_children],
		pageSize: pageSize
	};
};

export const actions = {
	add: async ({ request, cookies }) => {
		const _formData = (await request.formData()).get('formData');
		if (_formData) {
			const formData = JSON.parse(_formData as string);
			try {
				const newChild: RawChild = {
					name: formData.name,
					tally: formData.tally
				};
				if (!cookies.get('added_children')) {
					cookies.set('added_children', JSON.stringify([newChild]));
				} else {
					const added_children = JSON.parse(cookies.get('added_children') as string);
					cookies.set('added_children', JSON.stringify([...added_children, newChild]));
				}
			} catch (error) {
				return fail(500, { message: 'Internal server error' });
			}
		} else {
			return fail(400, { message: 'Invalid form data' });
		}
	},
	remove: async ({ request, cookies }) => {
		const _formData = (await request.formData()).get('formData');
		if (_formData) {
			const formData = JSON.parse(_formData as string);
			try {
				const added_children = JSON.parse(cookies.get('added_children') as string);
				const new_added_children = added_children.filter(
					(child: RawChild) => child.name !== formData.name
				);
				cookies.set('added_children', JSON.stringify(new_added_children));
			} catch (error) {
				return fail(500, { message: 'Internal server error' });
			}
		} else {
			return fail(400, { message: 'Invalid form data' });
		}
	}
} satisfies Actions;
