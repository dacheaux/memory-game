export const INIT_GAME = 'INIT_GAME';
export const FLIP_UP = 'FLIP_UP';
export const FLIP_DOWN = 'FLIP_DOWN';

export function initGame() {
	return { type: INIT_GAME };
}

export function flipUp(id, image, firstGuess, turns) {
	return {
		type: FLIP_UP, id, image, firstGuess, turns,
	};
}

export function flipDown(firstGuess, secondGuess) {
	return { type: FLIP_DOWN, firstGuess, secondGuess };
}
