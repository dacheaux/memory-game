import React from 'react';
import PropTypes from 'prop-types';
import backImg from '../images/back.png';
import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';
import image5 from '../images/5.png';
import image6 from '../images/6.png';
import image7 from '../images/7.png';
import image8 from '../images/8.png';
import image9 from '../images/9.png';
import image10 from '../images/10.png';
import image11 from '../images/11.png';
import image12 from '../images/12.png';

const images = {
	image1,
	image2,
	image3,
	image4,
	image5,
	image6,
	image7,
	image8,
	image9,
	image10,
	image11,
	image12,
};

const Card = (props) => {
	const {
		id, flippedUp, matched, gameComplete, onClick,
	} = props;
	const onCardClicked = gameComplete ? null : () => onClick(id, props.image);
	let { image } = props;
	image = flippedUp || matched ? images[image] : backImg;
	return (
		<div
			className="card"
			style={{ backgroundImage: `url(${image})` }}
			onClick={onCardClicked}
			onKeyPress={() => {}}
			role="presentation"
		>
			<div className="square" />
		</div>
	);
};

Card.propTypes = {
	id: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	flippedUp: PropTypes.bool.isRequired,
	matched: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	gameComplete: PropTypes.bool.isRequired,
};

export default Card;
