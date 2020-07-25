import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GameEndWindow = (props) => {
	const [nameInputValue, setNameInputValue] = useState('');

	const beatRecordForm = props.beatRecord ? (
		<div id="beat-record-form">
			<span>
				You're among the top 10 scorers. Please enter your name to be part of
				the leaderboard.
			</span>
			<div id="input-section">
				<input
					type="text"
					id="name-input"
					value={nameInputValue}
					onChange={(e) => setNameInputValue(e.target.value)}
				></input>
				<button
					id="submit-name-button"
					onClick={() => props.submitName(nameInputValue)}
				>
					Submit
				</button>
			</div>
		</div>
	) : null;

	return (
		<div id="game-end-window">
			<span>Congratulations!</span>
			<span>{`You took ${props.time} seconds to finish the game.`}</span>
			{beatRecordForm}
			<button id="play-again-button" onClick={props.playAgain}>
				Play Again
			</button>
		</div>
	);
};

GameEndWindow.propTypes = {
	time: PropTypes.number,
	playAgain: PropTypes.func,
	beatRecord: PropTypes.bool,
	submitName: PropTypes.func,
};

export default GameEndWindow;
