import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';
import { flipUp, flipDown } from './actions';

class Game extends Component {
  componentDidUpdate() {
    const { firstCard, secondCard, openPair, flipDown } = this.props;
    clearTimeout(this.timeid);
    if (openPair) {
      this.timeid = setTimeout(
        (curr, next) => flipDown(firstCard, secondCard),
        1000
      );
    }
  }

  render() {
    const { onCardClicked, turns, pairsMatched } = this.props;
    const { cards } = this.props;
    const cardTiles = cards.map(card => (
      <Card {...card} onClick={onCardClicked} key={card.id} />
    ));
    return (
      <div>
        <div>Turns: {turns}</div>
        <div>Pairs matched: {pairsMatched}</div>
        <div className="card-container">{cardTiles}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { ...state };
}

function mapDispatchToProps(dispatch) {
  return {
    onCardClicked: (id, image) => {
      dispatch(flipUp(id, image));
    },
    flipDown: (firstCard, secondCard) =>
      dispatch(flipDown(firstCard, secondCard))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
