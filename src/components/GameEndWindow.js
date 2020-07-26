import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './GameEndWindow.css';

const GameEndWindow = (props) => {
	const [nameInputValue, setNameInputValue] = useState('');
	const window = useRef(null);

	useEffect(() => {
		if (props.gameEnded) {
			window.current.scrollIntoView({ block: 'center', inline: 'center' });
		}
	}, [props.gameEnded]);

	const beatRecordForm = props.beatRecord ? (
		<div id="beat-record-form">
			<span>
				You're among the top 10 scorers. Please enter your name to join the
				leaderboard.
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
		<div id="game-end-window" ref={window}>
			<span id="congratulations">Congratulations!</span>
			<span id="time-message">
				You took <strong>{props.time}</strong> seconds to finish the game.
			</span>
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
	gameEnded: PropTypes.bool,
};

export default GameEndWindow;
