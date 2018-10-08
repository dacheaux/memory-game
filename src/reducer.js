import {
  INIT_GAME,
  SHUFFLE_CARDS,
  FLIP_UP,
  FLIP_DOWN,
  MATCH_PAIRS,
  flipDown,
  matchPairs
} from './actions';
import { shuffle, makeCardSet } from './utilities';

const initialState = {
  firstCard: null,
  secondCard: null,
  pairsMatched: 0,
  openPair: false,
  turns: 0,
  gameComplete: false,
  cards: makeCardSet()
};

function cardsReducer(state, action) {
  switch (action.type) {
    case SHUFFLE_CARDS:
      const cards = [...state];
      return shuffle(cards);
    case FLIP_UP:
      return state.map(card => {
        return action.id === card.id ? { ...card, flippedUp: true } : card;
      });
    case FLIP_DOWN:
      return state.map(
        card => (!card.matched ? { ...card, flippedUp: false } : card)
      );
    case MATCH_PAIRS:
      return state.map(card => {
        if (card.image === action.firstCard || card.image === action.secondCard) {
          return { ...card, matched: true };
        }
        return card;
      });
    default:
      return state;
  }
}

export default function gameReducer(state = initialState, action) {
  let {
    firstCard,
    secondCard,
    pairsMatched,
    openPair,
    turns,
    gameComplete,
    cards
  } = state;
  switch (action.type) {
    case INIT_GAME:
      return state;
    case SHUFFLE_CARDS:
      cards = cardsReducer(cards, action);
      return { ...state, cards };
    case FLIP_UP:
        if (secondCard && firstCard !== secondCard) {
        cards = cardsReducer(cards, flipDown());
        firstCard = null;
        secondCard = null;
        return gameReducer({...state, cards, firstCard, secondCard}, action);
      }
      cards = cardsReducer(cards, action);
      if (turns % 2) {
        secondCard = action.image;
      } else {
        firstCard = action.image;
        secondCard = null;
        openPair = false;
      }
      turns = turns + 1;
      if (secondCard && firstCard === secondCard) {
        cards = cardsReducer(cards, matchPairs(firstCard, secondCard));
        pairsMatched = pairsMatched + 1;
        gameComplete = pairsMatched === 12 ? true : false;
      } else if (secondCard && firstCard) {
        openPair = true;
      }
      return {
        firstCard,
        secondCard,
        pairsMatched,
        openPair,
        turns,
        gameComplete,
        cards
      };
    case FLIP_DOWN:
      if (secondCard && firstCard !== secondCard) {
        cards = cardsReducer(cards, flipDown());
        openPair = false;
        return { ...state, cards, openPair };
      }
      return state;
    default:
      return state || initialState;
  }
}
