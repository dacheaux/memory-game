export const INIT_GAME = 'INIT_GAME';
export const SHUFFLE_CARDS = 'SHUFFLE_CARDS';
export const FLIP_UP = 'FLIP_UP';
export const FLIP_DOWN = 'FLIP_DOWN';
export const MATCH_PAIRS = 'MATCH_PAIRS';
export const PAIR_IS_MATCHED = 'PAIR_IS_MATCHED';

export function shuffleCards() {
	return { type: SHUFFLE_CARDS };
}

export function flipUp(id, image) {
	return { type: FLIP_UP, id, image };
}

export function matchPairs(firstCard, secondCard) {
	return { type: MATCH_PAIRS, firstCard, secondCard };
}

export function flipDown(firstCard, secondCard) {
	return { type: FLIP_DOWN, firstCard, secondCard };
}
