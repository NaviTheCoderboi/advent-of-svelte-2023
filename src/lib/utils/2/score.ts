import { writable } from 'svelte/store';

const bar = writable<number>(97);

export default bar;
