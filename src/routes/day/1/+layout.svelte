<script lang="ts">
	import Navbar from '$lib/components/1/Navbar.svelte';
</script>

<Navbar />
<slot />

<style>
	::-webkit-scrollbar,
	::-webkit-scrollbar-track {
		width: 10px;
		background: #000;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgb(55 65 81);
		border-radius: 4px;
	}

	:global(body) {
		background-color: #000;
		color: #fff;
	}
</style>
