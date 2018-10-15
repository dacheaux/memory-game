import { combineReducers } from 'redux-immutable';
import {
	fromJS,
} from 'immutable';
import {
	INIT_GAME,
	FLIP_UP,
	FLIP_DOWN,
	MATCH_PAIRS,
	flipDown,
	matchPairs,
} from './actions';
import makeCardSet from './utilities';

const initialState = {
	firstCard: null,
	secondCard: null,
	pairsMatched: 0,
	openPair: false,
	turns: 0,
	gameComplete: false,
	cards: makeCardSet(),
};

function cardsReducer(state, action) {
	switch (action.type) {
	case FLIP_UP:
		return state.map(card => (action.id === card.get('id')
			? card.set('flippedUp', true)
			: card));
	case FLIP_DOWN:
		return state.map(
			card => (!card.get('matched') ? card.set('flippedUp', false) : card)
		);
	case MATCH_PAIRS:
		return state.map((card) => {
			if (
				card.get('image') === action.firstCard
					|| card.get('image') === action.secondCard
			) {
				return card.set('matched', true);
			}
			return card;
		});
	default:
		return state;
	}
}

export function gameReducer(state = fromJS(initialState), action) {
	let firstCard = state.get('firstCard');


	let secondCard = state.get('secondCard');


	let pairsMatched = state.get('pairsMatched');


	let openPair = state.get('openPair');


	let turns = state.get('turns');


	let gameComplete = state.get('gameComplete');


	let cards = state.get('cards');
	switch (action.type) {
	case INIT_GAME:
		return state;
	case FLIP_UP:
		if (secondCard && firstCard !== secondCard) {
			cards = cardsReducer(cards, flipDown());
			firstCard = null;
			secondCard = null;
			return gameReducer(
				state.merge({ cards, firstCard, secondCard }),
				action
			);
		}
		cards = cardsReducer(cards, action);
		if (turns % 2) {
			secondCard = action.image;
		} else {
			firstCard = action.image;
			secondCard = null;
			openPair = false;
		}
		turns += 1;
		if (secondCard && firstCard === secondCard) {
			cards = cardsReducer(cards, matchPairs(firstCard, secondCard));
			pairsMatched += 1;
			gameComplete = pairsMatched === 12;
		} else if (secondCard && firstCard) {
			openPair = true;
		}
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
		if (secondCard && firstCard !== secondCard) {
			cards = cardsReducer(cards, flipDown());
			openPair = false;
			return state.merge({ cards, openPair });
		}
		return state;
	default:
		return state || initialState;
	}
}

export default combineReducers({
	game: gameReducer,
});
