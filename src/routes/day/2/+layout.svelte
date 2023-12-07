<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar Title="Santa's cookie jar" />
<slot />

<style>
	:global(*)::-webkit-scrollbar,
	:global(*)::-webkit-scrollbar-track {
		width: 10px;
		background: #000;
	}

	:global(*)::-webkit-scrollbar-thumb {
		background-color: rgb(55 65 81);
		border-radius: 4px;
	}

	:global(body) {
		background-color: #000;
		color: #fff;
	}
</style>
