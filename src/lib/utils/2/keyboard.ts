import type * as PIXI from 'pixi.js';
import jump from './jump';
import Bar from './score';

const reduceBarOnWalk = () => {
	Bar.update((n) => {
		const random = Math.floor(Math.random() * (40 - 1 + 1)) + 1;
		if (random === 1) {
			return n - (Math.floor(Math.random() * (3 - 1 + 1)) + 1);
		}
		return n;
	});
};

let stopAnimationTimeout: NodeJS.Timeout;

const keyState: { [key: string]: boolean } = {
	ArrowLeft: false,
	ArrowRight: false,
	ArrowUp: false
};

const keyDown = (
	e: KeyboardEvent,
	santaSprite: PIXI.AnimatedSprite,
	standFrame: PIXI.Texture,
	stageWidth: number
) => {
	if (e.key === 'ArrowLeft') {
		reduceBarOnWalk();
		if (santaSprite.x <= 0) {
			santaSprite.x = stageWidth;
		}
		if (!e.repeat) {
			if (santaSprite.scale.x > 0) {
				santaSprite.scale.x *= -1;
			}
			santaSprite.x -= 8;
			santaSprite.stop();
			santaSprite.texture = standFrame;
		} else {
			keyState[e.key] = true;
			clearTimeout(stopAnimationTimeout);
			if (santaSprite.scale.x > 0) {
				santaSprite.scale.x *= -1;
			}
			santaSprite.x -= 6;
			santaSprite.play();
			stopAnimationTimeout = setTimeout(() => {
				santaSprite.stop();
				santaSprite.texture = standFrame;
			}, 500);
		}
		e.preventDefault();
	} else if (e.key === 'ArrowRight') {
		reduceBarOnWalk();
		if (santaSprite.x >= stageWidth) {
			santaSprite.x = 0;
		}
		if (!e.repeat) {
			if (santaSprite.scale.x < 0) {
				santaSprite.scale.x *= -1;
			}
			santaSprite.x += 8;
			santaSprite.stop();
		} else {
			keyState[e.key] = true;
			clearTimeout(stopAnimationTimeout);
			if (santaSprite.scale.x < 0) {
				santaSprite.scale.x *= -1;
			}
			santaSprite.x += 6;
			santaSprite.play();
			stopAnimationTimeout = setTimeout(() => {
				santaSprite.stop();
				santaSprite.texture = standFrame;
			}, 100);
		}
		e.preventDefault();
	} else if (e.key === 'ArrowUp') {
		reduceBarOnWalk();
		if (!e.repeat) {
			jump(santaSprite, standFrame);
		} else {
			keyState[e.key] = true;
			clearTimeout(stopAnimationTimeout);
			jump(santaSprite, standFrame);
			stopAnimationTimeout = setTimeout(() => {
				santaSprite.stop();
				santaSprite.texture = standFrame;
			}, 100);
		}
		e.preventDefault();
	}
	if (keyState['ArrowLeft'] && keyState['ArrowUp']) {
		reduceBarOnWalk();
		if (santaSprite.x <= 0) {
			santaSprite.x = stageWidth;
		}
		clearTimeout(stopAnimationTimeout);
		if (santaSprite.scale.x > 0) {
			santaSprite.scale.x *= -1;
		}
		santaSprite.x -= 6;
		jump(santaSprite, standFrame);
		santaSprite.play();
		stopAnimationTimeout = setTimeout(() => {
			santaSprite.stop();
			santaSprite.texture = standFrame;
		}, 500);
		e.preventDefault();
	} else if (keyState['ArrowRight'] && keyState['ArrowUp']) {
		reduceBarOnWalk();
		if (santaSprite.x >= stageWidth) {
			santaSprite.x = 0;
		}
		clearTimeout(stopAnimationTimeout);
		if (santaSprite.scale.x < 0) {
			santaSprite.scale.x *= -1;
		}
		santaSprite.x += 6;
		jump(santaSprite, standFrame);
		santaSprite.play();
		stopAnimationTimeout = setTimeout(() => {
			santaSprite.stop();
			santaSprite.texture = standFrame;
		}, 100);
		e.preventDefault();
	}
};

const keyUp = (e: KeyboardEvent) => {
	keyState[e.key] = false;
};

export { keyDown, keyUp };
