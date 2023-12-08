import cookie from '$lib/assets/2/cookie.webp';
import HoHoHoSound from '$lib/assets/2/santa.mp3';
import { Bump } from '$lib/utils/2/bump';
import { Howl } from 'howler';
import * as PIXI from 'pixi.js';
import { get } from 'svelte/store';
import type Santa from './santa';
import Bar from './score';

class Cookie extends PIXI.Sprite {
	constructor(x: number, y: number) {
		super(PIXI.Texture.from(cookie));
		this.anchor.set(0.5);
		this.x = x;
		this.y = y;
		this.scale.set(0.2);
		this.zIndex = 1;
	}

	fall() {
		this.y += 0.8;
	}
}

const generateCookies = (n: number, screenWidth: number) => {
	const cookies: Cookie[] = [];
	for (let i = 0; i < n; i++) {
		const cookie = new Cookie(
			Math.random() * screenWidth,
			Math.floor(Math.random() * (300 - 10 + 1)) + 10
		);
		cookies.push(cookie);
	}
	return cookies;
};

const bump = new Bump(PIXI);
const HoHoHo = new Howl({
	src: HoHoHoSound,
	autoplay: false,
	loop: false,
	volume: 1.5
});

const ticker = (
	jar: PIXI.Container,
	screenWidth: number,
	screenHeight: number,
	santaSprite: Santa
) => {
	jar.children.forEach((cookie) => {
		if (cookie instanceof Cookie) {
			cookie.fall();
			if (cookie.y >= screenHeight - 145) {
				jar.removeChild(cookie);
				const new_cookies = generateCookies(1, screenWidth);
				new_cookies.forEach((new_cookie) => {
					jar.addChild(new_cookie);
				});
			}
			const collided = bump.hitTestRectangle(santaSprite, cookie);
			if (collided) {
				jar.removeChild(cookie);
				if (get(Bar) < 100) {
					Bar.update((value) => {
						const new_value = Math.floor(Math.random() * (8 - 5 + 1)) + 5;
						if (value + new_value > 100) {
							return 100;
						}
						return value + new_value;
					});
				}
				if (get(Bar) < 98 && get(Bar) > 85) {
					const random = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
					if (random == 2) {
						Bar.set(0);
						alert("You lost! Don't make santa sick!");
					}
				} else if (get(Bar) > 98) {
					Bar.set(0);
					alert("You lost! Don't make santa sick!");
				}
				HoHoHo.play();
				const random_n = Math.floor(Math.random() * (10 - 1 + 1)) + 1;
				const new_cookies = generateCookies(random_n !== 1 ? 1 : 2, screenWidth);
				new_cookies.forEach((new_cookie) => {
					jar.addChild(new_cookie);
				});
			}
		}
	});
};

export default Cookie;
export { generateCookies, ticker };
