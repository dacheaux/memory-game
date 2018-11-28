import { fromJS } from 'immutable';
import { INIT_GAME, FLIP_UP } from '../actions';

const initialState = {
	firstGuess: '',
	secondGuess: '',
	pairsMatched: 0,
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
		let turns = state.get('turns');
		let pairsMatched = state.get('pairsMatched');
		let gameComplete = state.get('gameComplete');
		turns += 1;
		if (turns % 2) {
			firstGuess = action.image;
			secondGuess = null;
		} else {
			secondGuess = action.image;
			if (firstGuess === secondGuess) {
				pairsMatched += 1;
				gameComplete = pairsMatched === 12;
			}
		}
		return state.merge({
			firstGuess,
			secondGuess,
			pairsMatched,
			turns,
			gameComplete,
		});
	}
	default:
		return state || initialState;
	}
}
