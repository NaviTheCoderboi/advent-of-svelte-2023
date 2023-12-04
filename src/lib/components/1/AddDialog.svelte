<script lang="ts">
	export let open: boolean;
	let dialog: HTMLDialogElement;

	interface form_data {
		name: string;
		tally: number;
	}

	let Form_data: form_data = {
		name: '',
		tally: 0
	};

	const toggle = () => {
		if (open) {
			Form_data = {
				name: '',
				tally: 0
			};
		}
		open = !open;
	};

	$: if (dialog && open) dialog.showModal();
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-click-events-have-key-events -->
<dialog on:close={toggle} on:click|self={() => dialog.close()} bind:this={dialog}>
	<form
		class="relative flex flex-col gap-5 px-6 py-4 bg-slate-800 text-white"
		on:click|stopPropagation
		method="POST"
		action="?/add"
	>
		<input name="formData" class="hidden" value={JSON.stringify(Form_data)} />
		<h1 class="text-4xl font-medium text-center">New note</h1>
		<div class="inp relative">
			<input class="inp-input" type="text" required={true} bind:value={Form_data.name} />
			<span>name</span>
		</div>
		<div class="inp relative">
			<input class="inp-input" type="number" required={true} bind:value={Form_data.tally} />
			<span>tally</span>
		</div>
		<button
			class={`px-4 py-2 bg-rose-500 text-center rounded-md duration-200 ${
				Form_data.name == '' ? 'opacity-50 cursor-not-allowed' : ''
			}`}
			type="submit"
			disabled={Form_data.name == ''}>Add child</button
		>

		<button class="absolute right-5 top-5" type="button" on:click={() => dialog.close()}>
			<svg
				stroke="currentColor"
				fill="currentColor"
				stroke-width="0"
				viewBox="0 0 512 512"
				xmlns="http://www.w3.org/2000/svg"
				class="h-8"
				><path
					d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"
				/></svg
			>
		</button>
	</form>
</dialog>

<style>
	dialog {
		min-width: 35vw;
		max-width: 35vw;
	}

	dialog::backdrop {
		background-color: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: drop-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	dialog:not([open]) {
		animation: drop-out 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes drop-in {
		from {
			transform: translateY(-100%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes drop-out {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}

	.inp .inp-input {
		@apply bg-slate-800 border-2 border-slate-500 text-white text-2xl tracking-tighter outline-none rounded-md p-3 w-full font-extralight font-mono;
		resize: none;
	}

	.inp span {
		@apply absolute left-0 p-3 pointer-events-none text-2xl text-slate-500 uppercase duration-300 border-none font-mono;
	}

	.inp .inp-input:valid ~ span,
	.inp .inp-input:focus ~ span {
		border-left: 1px solid rgb(244 62 92);
		border-right: 1px solid rgb(244 63 94);
		@apply text-rose-500 translate-x-2 -translate-y-3 text-lg py-0 px-3 bg-slate-800 tracking-wide;
	}

	.inp .inp-input:valid,
	.inp .inp-input:focus {
		border: 1px solid rgb(244 63 94);
	}
</style>
