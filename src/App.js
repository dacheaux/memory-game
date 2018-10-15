import React from 'react';
import './App.css';
import Game from './Game';

export default () => (
	<div className="App">
		<header className="App-header">
			<h1>Memory Game</h1>
		</header>
		<main>
			<Game />
		</main>
	</div>
);
