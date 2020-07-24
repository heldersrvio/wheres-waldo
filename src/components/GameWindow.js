import React from 'react';
import GameWindowTopBar from './GameWindowTopBar';
import PropTypes from 'prop-types';

const GameWindow = (props) => {
	const openOptions = () => {};

	return (
		<div id="game-window">
			<GameWindowTopBar />
			<div id="image-grid">
				{Array(450)
					.fill(0)
					.map((v, i) => (
						<div className="image-cell" onClick={openOptions} key={i}></div>
					))}
			</div>
		</div>
	);
};

GameWindow.propTypes = {
	image: PropTypes.string,
};

export default GameWindow;
