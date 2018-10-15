const uuidv1 = require('uuid/v1');

function shuffle(cards) {
	for (let i = cards.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[cards[i], cards[j]] = [cards[j], cards[i]];
	}
	return cards;
}

export default function makeCardSet() {
	const cards = [];
	for (let i = 1; i <= 12; i += 1) {
		const key1 = uuidv1(); const
			key2 = uuidv1();
		const card = {
			id: key1,
			image: `image${i}`,
			flippedUp: false,
			matched: false,
		};
		cards.push(card, { ...card, id: key2 });
	}
	return shuffle(cards);
}
