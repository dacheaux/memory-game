import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import ToJS from './ToJS';
import { flipUp, flipDown } from './actions';

class Game extends Component {
	componentDidUpdate() {
		const { game, flipDownPair } = this.props;
		const { firstCard, secondCard, openPair } = game;
		clearTimeout(this.timeid);
		if (openPair) {
			this.timeid = setTimeout(() => flipDownPair(firstCard, secondCard), 1000);
		}
	}

	render() {
		const { game, onCardClicked } = this.props;
		const { turns, pairsMatched, cards } = game;
		const cardTiles = cards.map(card => <Card {...card} onClick={onCardClicked} key={card.id} />);
		return (
			<div>
				<div>
					<span>Turns: </span>
					<span>{turns}</span>
				</div>
				<div>
					<span>Pairs matched: </span>
					<span>{pairsMatched}</span>
				</div>
				<div className="card-container">{cardTiles}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { game: state.get('game') };
}

function mapDispatchToProps(dispatch) {
	return {
		onCardClicked: (id, image) => {
			dispatch(flipUp(id, image));
		},
		flipDownPair: (firstCard, secondCard) => dispatch(flipDown(firstCard, secondCard)),
	};
}

const ConnectedGame = connect(
	mapStateToProps,
	mapDispatchToProps
)(ToJS(Game));

export default ConnectedGame;
