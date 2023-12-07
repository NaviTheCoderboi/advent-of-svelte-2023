import Jump from '$lib/assets/2/jump.png';
import * as PIXI from 'pixi.js';

let jumping: boolean = false;
const axis: 'x' | 'y' = 'y';
const direction: number = 1;
const gravity: number = 1;
const power: number = 15;
const jumpAt: number = 555;

let jumpTextureTimeout: NodeJS.Timeout;
const jump = (santaRun: PIXI.AnimatedSprite, standFrame: PIXI.Texture) => {
	if (jumping) return;
	jumping = true;

	let time = 0;
	const tick = (delta: number) => {
		clearTimeout(jumpTextureTimeout);
		const jumpHeight = (-gravity / 2) * Math.pow(time, 2) + power * time;

		if (jumpHeight < 0) {
			santaRun[axis] = jumpAt;
			jumping = false;
			santaRun.texture = standFrame;
			PIXI.Ticker.shared.remove(tick);
			return;
		}

		santaRun[axis] = jumpAt - jumpHeight * direction;
		santaRun.texture = PIXI.Texture.from(Jump);
		time += delta;
		jumpTextureTimeout = setTimeout(() => {
			santaRun.texture = standFrame;
		}, 100);
	};

	PIXI.Ticker.shared.add(tick);
};

export default jump;
