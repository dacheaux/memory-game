export const INIT_GAME = 'INIT_GAME';
export const FLIP_UP = 'FLIP_UP';
export const FLIP_DOWN = 'FLIP_DOWN';

export function initGame() {
	return { type: INIT_GAME };
}

export function flipUp(id, image) {
	return { type: FLIP_UP, id, image };
}

export function flipDown(firstCard, secondCard) {
	return { type: FLIP_DOWN, firstCard, secondCard };
}
