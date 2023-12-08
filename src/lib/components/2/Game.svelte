<script lang="ts">
	import Backdrop from '$lib/assets/2/backdrop.webp';
	import Xmas from '$lib/assets/2/xmas.mp3';
	import { generateCookies, ticker } from '$lib/utils/2/cookies';
	import { keyDown, keyUp } from '$lib/utils/2/keyboard';
	import santaSprite from '$lib/utils/2/santa';
	import { Howl } from 'howler';
	import * as PIXI from 'pixi.js';
	import { onDestroy, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let STARTED = writable<boolean>(false);
	const app = new PIXI.Application({
		width: 1000,
		height: 700
	});

	onMount(async () => {
		if (document.getElementById('game')) {
			document.getElementById('game')?.appendChild(app.view as HTMLCanvasElement);
		}
	});

	const xmasAudio = new Howl({
		src: Xmas,
		loop: true,
		volume: 0.4,
		autoplay: false
	});

	const stage = new PIXI.Container();
	stage.width = app.screen.width;
	stage.height = app.screen.height;
	stage.sortableChildren = true;
	app.stage.addChild(stage);

	const GameBackdrop = PIXI.Sprite.from(Backdrop);
	GameBackdrop.width = app.screen.width;
	GameBackdrop.height = app.screen.height;
	GameBackdrop.zIndex = -1;
	stage.addChild(GameBackdrop);

	const startText = new PIXI.Text('Click to start', {
		fontFamily: 'Arial',
		fontSize: 36,
		fill: 0xffffff,
		align: 'center'
	});
	startText.anchor.set(0.5);
	startText.x = app.screen.width / 2;
	startText.y = app.screen.height / 2;
	startText.zIndex = 5;
	stage.addChild(startText);

	const startButton = new PIXI.Graphics();
	startButton.beginFill(0xf43f5e);
	startButton.drawRoundedRect(0, 0, 250, 100, 10);
	startButton.endFill();
	startButton.eventMode = 'dynamic';
	startButton.on('pointerdown', () => {
		startGame();
		xmasAudio.play();
	});
	startButton.x = app.screen.width / 2 - 125;
	startButton.y = app.screen.height / 2 - 50;
	stage.addChild(startButton);

	const startGame = () => {
		if (!$STARTED) {
			STARTED.set(true);
			startText.visible = false;
			startButton.visible = false;
		}

		const SantaSprite = new santaSprite(app.screen.width / 2, app.screen.height - 145);
		window.addEventListener('keydown', (e) => {
			keyDown(e, SantaSprite, SantaSprite.getFrame(0), app.screen.width);
		});
		window.addEventListener('keyup', (e) => {
			keyUp(e);
		});
		stage.addChild(SantaSprite);

		const jar = new PIXI.Container();
		jar.width = app.screen.width;
		jar.height = app.screen.height;
		jar.zIndex = 10;
		stage.addChild(jar);

		generateCookies(Math.floor(Math.random() * 8) + 1, app.screen.width).forEach((cookie) => {
			jar.addChild(cookie);
		});

		PIXI.Ticker.shared.add(() => {
			ticker(jar, app.screen.width, app.screen.height, SantaSprite);
		});
	};

	onDestroy(() => {
		xmasAudio.stop();
		PIXI.Ticker.shared.stop();
		app.destroy(true);
	});
</script>

<div id="game" style="height: 700px;width: 1000px;"></div>
