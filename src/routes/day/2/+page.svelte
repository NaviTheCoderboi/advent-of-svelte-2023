<script lang="ts">
	import Cookie from '$lib/assets/2/cookie.webp';
	import Game from '$lib/components/2/Game.svelte';
	import SEO from '$lib/components/SEO.svelte';
	import Bar from '$lib/utils/2/score';
	import { onDestroy, onMount } from 'svelte';

	onMount(() => {
		Bar.set(0);
	});

	onDestroy(() => {
		Bar.set(0);
	});

	const getColor = (_bar: number) => {
		if (_bar < 10) {
			return 'bg-orange-500';
		} else if (_bar < 20) {
			return 'bg-yellow-500';
		} else if (_bar < 40) {
			return 'bg-pink-500';
		} else if (_bar < 60) {
			return 'bg-green-500';
		} else if (_bar < 80) {
			return 'bg-red-500';
		} else {
			return 'bg-red-700';
		}
	};

	const getEmoji = (_bar: number) => {
		if (_bar < 20) {
			return '😟';
		} else if (_bar < 40) {
			return '🙂';
		} else if (_bar < 60) {
			return '😋';
		} else if (_bar < 80) {
			return '😣';
		} else {
			return '🤢';
		}
	};

	let color = 'bg-yellow-500';
	let width = '0%';
	let emoji = '😟';

	Bar.subscribe((bar) => {
		color = getColor(bar);
		width = `${bar}%`;
		emoji = getEmoji(bar);
	});
</script>

<svelte:head>
	<SEO
		title="Santa cookie rush"
		description="A cookie collecting game made by NaviTheCoderboi"
		author="NaviTheCoderboi"
		keywords={['Santa', 'Christmas', 'Game', 'Cookies', 'NaviTheCoderboi']}
		og={{
			title: 'Santa cookie rush',
			description: 'A cookie collecting game made by NaviTheCoderboi',
			image: '/favicon.png',
			type: 'website'
		}}
		robots="index, follow"
		themeColor="#ec535b"
		twitter={{
			card: 'summary_large_image',
			creator: '@NaviTheCoderboi',
			description: 'A cookie collecting game made by NaviTheCoderboi',
			image: '/favicon.png',
			title: 'Santa cookie rush'
		}}
	/>
</svelte:head>
<div class="w-full">
	<main class="hidden md:block w-full px-2 lg:px-0 lg:w-3/5 mx-auto min-h-screen py-6">
		<div class="flex items-center gap-4 py-4">
			<h1 class="text-4xl font-bold">Santa cookie rush</h1>
			<img src={Cookie} alt="cookie" height="65" width="65" />
		</div>
		<div class="text-lg font-light text-gray-300">
			Run and collect cookies now! beware of santa , don't make him sick You can make santa a
			bit healty by running a bit without collecting cookies for a moment
		</div>
		<div class="flex justify-center items-center py-2">
			<div class="w-96 h-20 rounded-3xl border-8 border-gray-700">
				<div class="h-full rounded-xl {color}" style="width: {width}" />
			</div>
			<div class="text-6xl">
				{emoji}
			</div>
		</div>
		<div class="flex justify-center items-center py-10">
			<Game />
		</div>
		<div class="flex justify-center items-center gap-4 py-4">
			<div class="flex justify-center items-center gap-2">
				<button class="p-0.5 border-1 border-gray-700 rounded-md">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 512 512"
						xmlns="http://www.w3.org/2000/svg"
						height="30"
						width="30"
						><path
							d="M216.4 163.7c5.1 5 5.1 13.3.1 18.4L155.8 243h231.3c7.1 0 12.9 5.8 12.9 13s-5.8 13-12.9 13H155.8l60.8 60.9c5 5.1 4.9 13.3-.1 18.4-5.1 5-13.2 5-18.3-.1l-82.4-83c-1.1-1.2-2-2.5-2.7-4.1-.7-1.6-1-3.3-1-5 0-3.4 1.3-6.6 3.7-9.1l82.4-83c4.9-5.2 13.1-5.3 18.2-.3z"
						></path></svg
					>
				</button>
				<span class="text-base font-light text-gray-300">left</span>
			</div>
			<div class="flex justify-center items-center gap-2">
				<button class="p-0.5 border-1 border-gray-700 rounded-md">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 512 512"
						height="30"
						width="30"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M348.3 216.4c-5 5.1-13.3 5.1-18.4.1L269 155.8v231.3c0 7.1-5.8 12.9-13 12.9s-13-5.8-13-12.9V155.8l-60.9 60.8c-5.1 5-13.3 4.9-18.4-.1-5-5.1-5-13.2.1-18.3l83-82.4c1.2-1.1 2.5-2 4.1-2.7 1.6-.7 3.3-1 5-1 3.4 0 6.6 1.3 9.1 3.7l83 82.4c5.2 4.9 5.3 13.1.3 18.2z"
						></path></svg
					>
				</button>
				<span class="text-base font-light text-gray-300">jump</span>
			</div>
			<div class="flex justify-center items-center gap-2">
				<button class="p-0.5 border-1 border-gray-700 rounded-md">
					<svg
						stroke="currentColor"
						fill="currentColor"
						stroke-width="0"
						viewBox="0 0 512 512"
						height="30"
						width="30"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M295.6 163.7c-5.1 5-5.1 13.3-.1 18.4l60.8 60.9H124.9c-7.1 0-12.9 5.8-12.9 13s5.8 13 12.9 13h231.3l-60.8 60.9c-5 5.1-4.9 13.3.1 18.4 5.1 5 13.2 5 18.3-.1l82.4-83c1.1-1.2 2-2.5 2.7-4.1.7-1.6 1-3.3 1-5 0-3.4-1.3-6.6-3.7-9.1l-82.4-83c-4.9-5.2-13.1-5.3-18.2-.3z"
						></path></svg
					>
				</button>
				<span class="text-base font-light text-gray-300">right</span>
			</div>
		</div>
	</main>
	<main
		class="md:hidden h-[80vh] px-2 py-4 grid place-content-center text-2xl font-bold text-red-500"
	>
		<span>Sorry! you can't play this game on phone</span>
	</main>
</div>
