import React, { Component } from 'react';
import './App.css';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Memory Game
          </h1>
        </header>
        <main>
          <Game />
        </main>
      </div>
    );
  }
}

export default App;
