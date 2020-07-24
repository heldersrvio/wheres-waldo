import React, { useState } from 'react';
import GameSelectionWindow from './components/GameSelectionWindow';
import GameWindow from './components/GameWindow';

const App = () => {
	const [screen, setScreen] = useState('gameSelectionScreen');
	const [currentPicture, setCurrentPicture] = useState(null);

	const startGame = (picture) => {
		setScreen('playScreen');
		setCurrentPicture(picture);
	};

	const endGame = () => {
		setScreen('finalScreen');
	};

	const playAgain = () => {
		setScreen('gameSelectionScreen');
	};

	const currentScreenContainer =
		screen === 'gameSelectionScreen' ? (
			<GameSelectionWindow startGame={startGame} />
		) : screen === 'playScreen' ? (
			<GameWindow image={currentPicture} />
		) : null;

	return <div className="App">{currentScreenContainer}</div>;
};

export default App;
