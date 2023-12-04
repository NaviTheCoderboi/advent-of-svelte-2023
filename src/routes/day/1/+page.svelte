<script lang="ts">
	import { browser } from '$app/environment';
	import AddDialog from '$lib/components/1/AddDialog.svelte';
	import RemoveDialog from '$lib/components/1/RemoveDialog.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import { pageize } from '$lib/utils/1/common';
	import type { PageData } from './$types';

	export let data: PageData;

	let pages = pageize(data.allChildren, data.pageSize);
	let childSearch: string = '';
	let childSort = 'ascending';
	let current = 0;
	let currentPage = pages[current];

	const animate = (func: () => void) => {
		if (browser) {
			// @ts-ignore
			if (!document.startViewTransition) {
				func();
			}

			// @ts-ignore
			document.startViewTransition(() => {
				func();
			});
		}
	};

	const changePage = (page: number) => {
		animate(() => {
			current = page;
			currentPage = pages[current];
		});
	};

	const getGoodChildren = () => {
		let goodChildren = 0;
		data.allChildren.forEach((child) => {
			if (child.tally >= 0) goodChildren++;
		});
		return goodChildren;
	};

	const getNaughtyChildren = () => {
		let naughtyChildren = 0;
		data.allChildren.forEach((child) => {
			if (child.tally < 0) naughtyChildren++;
		});
		return naughtyChildren;
	};

	const getNaghtiestChild = () => {
		let naughtiestChild = data.allChildren[0];
		data.allChildren.forEach((child) => {
			if (child.tally < naughtiestChild.tally) naughtiestChild = child;
		});
		return naughtiestChild;
	};

	const getNicestChild = () => {
		let nicestChild = data.allChildren[0];
		data.allChildren.forEach((child) => {
			if (child.tally > nicestChild.tally) nicestChild = child;
		});
		return nicestChild;
	};

	$: if (childSort === 'ascending') {
		pages = pageize(
			data.allChildren.sort((a, b) => {
				if (a.tally < b.tally) return -1;
				if (a.tally > b.tally) return 1;
				return 0;
			}),
			data.pageSize
		);
		currentPage = pages[current];
	} else if (childSort === 'descending') {
		pages = pageize(
			data.allChildren.sort((a, b) => {
				if (a.tally < b.tally) return 1;
				if (a.tally > b.tally) return -1;
				return 0;
			}),
			data.pageSize
		);
		currentPage = pages[current];
	} else if (childSort === 'alphabetical') {
		pages = pageize(
			data.allChildren.sort((a, b) => {
				if (a.name < b.name) return -1;
				if (a.name > b.name) return 1;
				return 0;
			}),
			data.pageSize
		);
		currentPage = pages[current];
	}

	$: if (childSearch === '') {
		pages = pageize(data.allChildren, data.pageSize);
		currentPage = pages[current];
	} else {
		pages = pageize(
			data.allChildren.filter((child) =>
				child.name.toLowerCase().includes(childSearch.toLowerCase())
			),
			data.pageSize
		);
		currentPage = pages[current];
	}

	let addOpen: boolean = false;
	let removeOpen: boolean = false;
</script>

<svelte:head>
	<SEO
		title="Elves's dashboard"
		description="Elves's dashboard made by NaviTheCoderboi"
		author="NaviTheCoderboi"
		keywords={['Elves', 'Santa', 'Christmas', 'NaviTheCoderboi']}
		og={{
			title: "Elves's dashboard",
			description: "Elves's dashboard made by NaviTheCoderboi",
			image: '/favicon.png',
			type: 'website'
		}}
		robots="index, follow"
		themeColor="#ec535b"
		twitter={{
			card: 'summary_large_image',
			creator: '@NaviTheCoderboi',
			description: "Elves's dashboard made by NaviTheCoderboi",
			image: '/favicon.png',
			title: "Elves's dashboard"
		}}
	/>
</svelte:head>
<div class="w-full">
	<main class="w-full px-2 lg:px-0 lg:w-3/5 mx-auto min-h-screen py-6">
		<div
			class="flex flex-col lg:flex-row justify-center lg:justify-normal items-center gap-6 w-full p-4 border-0.5 border-gray-800 mb-4"
		>
			<div
				class="box"
				style="--clr: #0de5a8;--i: {(getGoodChildren() / data.allChildren.length) * 100}%"
			>
				<div class="circle">
					<h1>
						{Math.ceil((getGoodChildren() / data.allChildren.length) * 100)}<small
							>%</small
						>
					</h1>
				</div>
				<h1 class="title">Good children</h1>
			</div>
			<div
				class="box"
				style="--clr: #fd0a54;--i: {(getNaughtyChildren() / data.allChildren.length) *
					100}%"
			>
				<div class="circle">
					<h1>
						{Math.ceil((getNaughtyChildren() / data.allChildren.length) * 100)}<small
							>%</small
						>
					</h1>
				</div>
				<h1 class="title">Naughty children</h1>
			</div>
			<div class="p-2 w-fit">
				<table class="text-left w-full border-x-0.5 border-t-0.5 border-gray-800">
					<thead class="border-b-0.5 border-gray-800">
						<th class="p-4 text-xl font-light">Type</th>
						<th class="p-4 text-xl font-light">Name</th>
						<th class="p-4 text-xl font-light">Tally</th>
					</thead>
					<tbody>
						<tr class="border-b-0.5 border-b-gray-800">
							<td class="p-4 text-lg font-light text-gray-300"> Naughtiest </td>
							<td class="p-4 text-lg font-light text-gray-300"
								>{getNaghtiestChild().name}</td
							>
							<td class="p-4 text-lg font-light text-gray-300">
								{getNaghtiestChild().tally}
							</td>
						</tr>
						<tr class="border-b-0.5 border-b-gray-800">
							<td class="p-4 text-lg font-light text-gray-300"> Nicest </td>
							<td class="p-4 text-lg font-light text-gray-300"
								>{getNicestChild().name}</td
							>
							<td class="p-4 text-lg font-light text-gray-300">
								{getNicestChild().tally}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="border-0.5 border-gray-800 p-4 w-full flex flex-col justify-center gap-4">
				<button
					class="bg-green-500 w-full text-center py-2 text-2xl font-light rounded-md"
					on:click={() => (addOpen = true)}
				>
					Add Child
				</button>
				<button
					class="bg-rose-500 w-full text-center py-2 text-2xl font-light rounded-md"
					on:click={() => (removeOpen = true)}
				>
					Remove Child
				</button>
			</div>
		</div>
		<div class="w-full rounded-md border-x-0.5 border-t-0.5 border-gray-800">
			<div
				class="flex flex-col lg:flex-row items-center gap-5 p-4 border-b-0.5 border-slate-800"
			>
				<input
					type="text"
					placeholder="search child..."
					class="outline-none bg-black border-0.5 border-gray-700 rounded-md placeholder:text-sm placeholder:text-gray-300 p-2 text-sm focus:border-gray-600 duration-200"
					bind:value={childSearch}
				/>
				<div
					class="border-0.5 border-gray-700 rounded-md flex justify-center items-center gap-2 text-sm p-2 hover:border-gray-600 duration-200"
				>
					sort by:
					<select
						name="children"
						class="bg-black outline-none text-gray-300 duration-200"
						bind:value={childSort}
					>
						<option value="ascending">ascending</option>
						<option value="descending">descending</option>
						<option value="alphabetical">alphabetical</option>
					</select>
				</div>
				<div
					class="border-0.5 border-gray-700 rounded-md hover:border-gray-600 duration-200 p-2"
				>
					Total children: {data.allChildren.length}
				</div>
			</div>
			<table class="w-full text-left">
				<thead class="border-b-0.5 border-gray-800">
					<th class="p-4 text-xl font-light">Name</th>
					<th class="p-4 text-xl font-light">Tally</th>
					<th class="p-4 text-xl font-light">Character</th>
				</thead>
				<tbody>
					{#if currentPage == undefined || currentPage.length === 0}
						<tr class="border-b-0.5 border-b-gray-800">
							<td class="p-4 text-lg font-light text-gray-300" colspan="3">
								No children found
							</td>
						</tr>
					{:else}
						{#each currentPage as child (child)}
							<tr class="border-b-0.5 border-b-gray-800">
								<td class="p-4 text-lg font-light text-gray-300">{child.name}</td>
								<td class="p-4 text-lg font-light text-gray-300">{child.tally}</td>
								<td class="p-4 text-lg font-light text-gray-300"
									>{child.character}</td
								>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
			<div class="p-4 border-b-0.5 border-gray-800 text-xl font-light">
				<div class="grid place-content-center gap-5 grid-cols-2 grid-rows-1">
					<div>Page {pages.length == 0 ? 0 : current + 1} of {pages.length}</div>
					<ul class="flex justify-center items-center gap-2">
						<button
							class={`p-1 border-0.5 border-gray-700 rounded-md duration-200 ${
								current === 0
									? 'opacity-75 cursor-not-allowed'
									: 'hover:border-gray-600'
							}`}
							disabled={current === 0}
							on:click={() => changePage(0)}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 24 24"
								height="25"
								width="25"
								xmlns="http://www.w3.org/2000/svg"
								><path fill="none" d="M0 0h24v24H0z"></path><path
									d="M17.59 18L19 16.59 14.42 12 19 7.41 17.59 6l-6 6z"
								></path><path d="M11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z"
								></path></svg
							>
						</button>
						<button
							class={`p-1 border-0.5 border-gray-700 rounded-md duration-200 ${
								current < 1
									? 'opacity-75 cursor-not-allowed'
									: 'hover:border-gray-600'
							}`}
							disabled={current < 1}
							on:click={() => changePage(current - 1)}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 24 24"
								height="25"
								width="25"
								xmlns="http://www.w3.org/2000/svg"
								><path fill="none" d="M0 0h24v24H0V0z"></path><path
									d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
								></path></svg
							>
						</button>
						<button
							class={`p-1 border-0.5 border-gray-700 rounded-md hover:border-gray-600 duration-200 ${
								current === pages.length - 1
									? 'opacity-75 cursor-not-allowed'
									: 'hover:border-gray-600'
							}`}
							disabled={current === pages.length - 1}
							on:click={() => changePage(current + 1)}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 24 24"
								height="25"
								width="25"
								xmlns="http://www.w3.org/2000/svg"
								><path fill="none" d="M0 0h24v24H0V0z"></path><path
									d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
								></path></svg
							>
						</button>
						<button
							class={`p-1 border-0.5 border-gray-700 rounded-md hover:border-gray-600 duration-200 ${
								current === pages.length - 1
									? 'opacity-75 cursor-not-allowed'
									: 'hover:border-gray-600'
							}`}
							disabled={current === pages.length - 1}
							on:click={() => changePage(pages.length - 1)}
						>
							<svg
								stroke="currentColor"
								fill="currentColor"
								stroke-width="0"
								viewBox="0 0 24 24"
								height="25"
								width="25"
								xmlns="http://www.w3.org/2000/svg"
								><path fill="none" d="M0 0h24v24H0z"></path><path
									d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6z"
								></path><path d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z"
								></path></svg
							>
						</button>
					</ul>
				</div>
			</div>
		</div>
	</main>
</div>
<AddDialog bind:open={addOpen} />
<RemoveDialog bind:open={removeOpen} />

<style>
	.box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 40px;
		width: 200px;
		height: auto;
		position: relative;
	}

	.box .circle {
		position: relative;
		width: 150px;
		height: 150px;
		background: conic-gradient(
			from 0deg,
			var(--clr) 0%,
			var(--clr) 0% var(--i),
			#333 var(--i),
			#333 100%
		);
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.box .circle::after {
		content: '';
		position: absolute;
		inset: -5px;
		background: conic-gradient(
			from 0deg,
			var(--clr) 0%,
			var(--clr) 0% var(--i),
			#333 var(--i),
			#333 100%
		);
		filter: blur(20px);
		border-radius: 50%;
		z-index: -2;
	}

	.box .circle::before {
		content: '';
		position: absolute;
		inset: 10px;
		background-color: #25252b;
		border-radius: 50%;
	}

	.box .title {
		height: 50px;
		width: 100%;
		text-align: center;
		font-weight: 900;
		font-size: 1rem;
		letter-spacing: 3px;
		transform: uppercase;
	}

	.box .circle h1 {
		z-index: 2;
		font-family: fantasy, monospace, 'Poppins', sans-serif;
		font-size: 2rem;
		letter-spacing: 1.5px;
	}

	.box .circle h1 small {
		font-size: 1.5rem;
		color: rgb(156 163 175);
	}
</style>
