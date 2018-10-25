import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Card from '../components/Card';
import * as allActions from '../actions';

class Game extends Component {
	componentDidUpdate() {
		const { game, action } = this.props;
		const { firstCard, secondCard, openPair } = game;
		clearTimeout(this.timeid);
		if (openPair) {
			this.timeid = setTimeout(
				() => action.flipDown(firstCard, secondCard),
				1000
			);
		}
	}

	render() {
		const { game, action } = this.props;
		const { turns, cards, gameComplete } = game;
		const cardTiles = cards.map(card => (
			<Card
				{...card}
				key={card.id}
				gameComplete={gameComplete}
				onClick={action.flipUp}
			/>
		));
		return (
			<div className="game">
				<div className="stats">
					<span>Turns: </span>
					<span className="space-right">{turns}</span>
					<span>
						{gameComplete && (
							<button
								type="button"
								onClick={() => action.initGame()}
							>
								<span>Restart</span>
							</button>
						)}
					</span>
				</div>
				<div className="card-container">{cardTiles}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	game: state.get('game').toJS(),
});

const mapDispatchToProps = dispatch => ({
	action: bindActionCreators(allActions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Game);
