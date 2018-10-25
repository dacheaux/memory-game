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

let firstGuess;
let secondGuess;
let openPair;
let turns;
let pairsMatched;
let gameComplete;

export default function (state = fromJS(initialState), action) {
	switch (action.type) {
	case INIT_GAME:
		return fromJS(initialState);
	case FLIP_UP:
		firstGuess = state.get('firstGuess');
		secondGuess = state.get('secondGuess');
		openPair = state.get('openPair');
		turns = state.get('turns');
		pairsMatched = state.get('pairsMatched');
		gameComplete = state.get('gameComplete');
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
	case FLIP_DOWN:
		firstGuess = state.get('firstGuess');
		secondGuess = state.get('secondGuess');
		openPair = state.get('openPair');
		if (secondGuess && secondGuess !== firstGuess) {
			openPair = false;
			return state.merge({ openPair });
		}
		return state;
	default:
		return state || initialState;
	}
}
