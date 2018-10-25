import { combineReducers } from 'redux-immutable';
import gameReducer from './gameReducer';
import cardsReducer from './cardsReducer';

export default combineReducers({
	game: gameReducer,
	cards: cardsReducer,
});
