import React from 'react';
import waldo from '../images/resized/waldo.jpg';
import wilma from '../images/resized/wilma.jpg';
import odlaw from '../images/resized/odlaw.jpg';
import wizardwhitebeard from '../images/resized/wizardwhitebeard.jpg';
import woof from '../images/resized/woof.jpg';
import PropTypes from 'prop-types';
import './GameScreenTopBar.css';

const GameScreenTopBar = (props) => {
	return (
		<div id="top-bar">
			<span id="find-span">Find: </span>
			{!props.identifiedCharacters.includes('waldo') ? (
				<div className="character-info">
					<img src={waldo} alt="Brown-haired man with glasses and a beanie." />
					<span>Waldo</span>
				</div>
			) : null}
			{!props.identifiedCharacters.includes('wilma') ? (
				<div className="character-info">
					<img
						src={wilma}
						alt="Brown-haired woman with glasses and a beanie."
					/>
					<span>Wilma</span>
				</div>
			) : null}
			{!props.identifiedCharacters.includes('odlaw') ? (
				<div className="character-info">
					<img
						src={odlaw}
						alt="Black-haired man with black and yellow clothes."
					/>
					<span>Odlaw</span>
				</div>
			) : null}
			{!props.identifiedCharacters.includes('wizard-whitebeard') ? (
				<div className="character-info">
					<img src={wizardwhitebeard} alt="Old wizard with long beard." />
					<span>Wizard Whitebeard</span>
				</div>
			) : null}
			{!props.identifiedCharacters.includes('woof') ? (
				<div className="character-info">
					<img src={woof} alt="White dog with striped tail." />
					<span>Woof</span>
				</div>
			) : null}
		</div>
	);
};

GameScreenTopBar.propTypes = {
	identifiedCharacters: PropTypes.arrayOf(PropTypes.string),
};

export default GameScreenTopBar;
