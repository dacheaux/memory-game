import { fromJS } from 'immutable';
import { INIT_GAME, FLIP_UP, FLIP_DOWN } from '../actions';

const initialState = {
	firstGuess: '',
	secondGuess: '',
	pairsMatched: 0,
	openPair: false,
	turns: 0,
	gameComplete: false,
};

export default function (state = fromJS(initialState), action) {
	switch (action.type) {
	case INIT_GAME:
		return fromJS(initialState);
	case FLIP_UP: {
		let firstGuess = state.get('firstGuess');
		let secondGuess = state.get('secondGuess');
		let openPair = state.get('openPair');
		let turns = state.get('turns');
		let pairsMatched = state.get('pairsMatched');
		let gameComplete = state.get('gameComplete');
		if (turns % 2) {
			secondGuess = action.image;
			if (firstGuess === secondGuess) {
				pairsMatched += 1;
				gameComplete = pairsMatched === 12;
			} else {
				openPair = true;
			}
		} else {
			firstGuess = action.image;
			secondGuess = null;
			openPair = false;
		}
		turns += 1;
		return state.merge({
			firstGuess,
			secondGuess,
			pairsMatched,
			openPair,
			turns,
			gameComplete,
		});
	}
	case FLIP_DOWN: {
		const firstGuess = state.get('firstGuess');
		const secondGuess = state.get('secondGuess');
		let openPair = state.get('openPair');
		if (secondGuess && secondGuess !== firstGuess) {
			openPair = false;
			return state.merge({ openPair });
		}
		return state;
	}
	default:
		return state || initialState;
	}
}
