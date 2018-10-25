import { fromJS } from 'immutable';
import { INIT_GAME, FLIP_UP, FLIP_DOWN } from '../actions';
import makeCardSet from '../utilities';

export default function (state = fromJS(makeCardSet()), action) {
	switch (action.type) {
	case INIT_GAME:
		return fromJS(makeCardSet());
	case FLIP_UP:
		if (action.turns % 2) {
			if (action.firstGuess === action.image) {
				return state.map((card) => {
					if (action.image === card.get('image')) {
						return card.set('matched', true);
					}
					return card.set('flippedUp', false);
				});
			}
			return state.map(
				card => (action.id === card.get('id')
					? card.set('flippedUp', true)
					: card)
			);
		}
		return state.map(
			card => (action.id === card.get('id')
				? card.set('flippedUp', true)
				: card.set('flippedUp', false))
		);

	case FLIP_DOWN:
		if (action.secondGuess && action.secondGuess !== action.firstGuess) {
			return state.map(card => card.set('flippedUp', false));
		}
		return state;
	default:
		return state;
	}
}
