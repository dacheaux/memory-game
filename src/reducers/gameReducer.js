import { fromJS } from 'immutable';
import { INIT_GAME, FLIP_UP, FLIP_DOWN } from '../actions';
import makeCardSet from '../utilities';

const initialState = {
	firstCard: null,
	secondCard: null,
	pairsMatched: 0,
	openPair: false,
	turns: 0,
	gameComplete: false,
	cards: makeCardSet(),
};

let firstCard;
let secondCard;
let openPair;
let cards;
let turns;
let pairsMatched;
let gameComplete;

export default function gameReducer(state = fromJS(initialState), action) {
	switch (action.type) {
	case INIT_GAME:
		return fromJS({ ...initialState, cards: makeCardSet() });
	case FLIP_UP:
		firstCard = state.get('firstCard');
		secondCard = state.get('secondCard');
		openPair = state.get('openPair');
		cards = state.get('cards');
		turns = state.get('turns');
		pairsMatched = state.get('pairsMatched');
		gameComplete = state.get('gameComplete');
		if (turns % 2) {
			secondCard = action.image;
			if (firstCard === secondCard) {
				cards = cards.map((card) => {
					if (card.get('image') === action.image) {
						return card.set('matched', true);
					}
					if (action.id === card.get('id')) {
						return card.set('flippedUp', true);
					}
					return card.set('flippedUp', false);
				});
				pairsMatched += 1;
				gameComplete = pairsMatched === 12;
			} else {
				cards = cards.map(
					card => (action.id === card.get('id')
						? card.set('flippedUp', true)
						: card)
				);
				openPair = true;
			}
		} else {
			cards = cards.map(
				card => (action.id === card.get('id')
					? card.set('flippedUp', true)
					: card.set('flippedUp', false))
			);
			firstCard = action.image;
			secondCard = null;
			openPair = false;
		}
		turns += 1;
		return state.merge({
			firstCard,
			secondCard,
			pairsMatched,
			openPair,
			turns,
			gameComplete,
			cards,
		});
	case FLIP_DOWN:
		cards = state.get('cards');
		firstCard = state.get('firstCard');
		secondCard = state.get('secondCard');
		openPair = state.get('openPair');
		if (secondCard && secondCard !== firstCard) {
			cards = cards.map(card => card.set('flippedUp', false));
			openPair = false;
			return state.merge({ cards, openPair });
		}
		return state;
	default:
		return state || initialState;
	}
}
