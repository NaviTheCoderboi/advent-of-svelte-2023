<script lang="ts">
	import Santa from '$lib/assets/1/santa.png';

	interface Day {
		name: string;
		link: string;
	}

	const Days: Day[] = [
		{
			name: "Elves's dashboard",
			link: '/day/1'
		},
		{
			name: "Santa's cookie jar",
			link: '/day/2'
		}
	];
</script>

<main class="flex justify-center py-10">
	<section class="flex flex-col gap-10">
		<div class="flex justify-center items-center gap-4">
			<img src={Santa} height="75" width="75" alt="adevnt-of-svelte" />
			<div class="flex justify-center items-center gap-4">
				<span class="text-5xl font-bold">Advent</span>
				<span class="text-5xl font-bold">of</span>
				<span class="text-5xl font-bold text-rose-500 underline">Svelte</span>
			</div>
		</div>
		<ul class="flex flex-col gap-4 px-4 py-6">
			{#each Days as day, i}
				<li class="flex gap-2 items-center">
					<div class="text-2xl font-bold">
						{i + 1}.
					</div>
					<a
						href={day.link}
						class="text-2xl font-semibold text-gray-300 hover:text-gray-50 duration-200 hover:font-bold"
					>
						{day.name}
					</a>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	:global(body) {
		color: #fff;
		background-color: #000;
	}
</style>
