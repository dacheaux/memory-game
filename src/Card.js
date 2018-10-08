import React, { Component } from 'react';

class Card extends Component {
  render() {
    const { id, flippedUp, onClick } = this.props;
    const image = flippedUp ? this.props.image : './images/layer3.png'; 
    return (
      <div
        className="card"
        style={{ backgroundImage: `url(${require(`${image}`)})` }}
        onClick={()=> onClick(id, this.props.image)}
      ><div className="square"></div></div>
    );
  }
}

export default Card;
