import Run1 from '$lib/assets/2/run1.png';
import Run2 from '$lib/assets/2/run2.png';
import Run3 from '$lib/assets/2/run3.png';
import Run4 from '$lib/assets/2/run4.png';
import Stand from '$lib/assets/2/stand.png';
import * as PIXI from 'pixi.js';

const FRAMES = [
	PIXI.Texture.from(Stand),
	PIXI.Texture.from(Run1),
	PIXI.Texture.from(Run2),
	PIXI.Texture.from(Run3),
	PIXI.Texture.from(Run4)
];

class Santa extends PIXI.AnimatedSprite {
	constructor(x: number, y: number) {
		super(FRAMES);
		this.animationSpeed = 0.15;
		this.anchor.set(0.5);
		this.scale.set(1.8);
		this.x = x;
		this.y = y;
		this.zIndex = 5;
		this.eventMode = 'dynamic';
		this.on('pointerdown', this.onClick);
	}

	onClick() {
		this.play();
		setTimeout(() => {
			this.currentFrame = 0;
			this.stop();
		}, 1000);
	}

	getFrame(n: number) {
		return FRAMES[n];
	}
}

export default Santa;
