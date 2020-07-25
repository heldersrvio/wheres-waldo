import React from 'react';
import waldo from '../images/resized/waldo.jpg';
import wilma from '../images/resized/wilma.jpg';
import odlaw from '../images/resized/odlaw.jpg';
import wizardwhitebeard from '../images/resized/wizardwhitebeard.jpg';
import woof from '../images/resized/woof.jpg';

const GameScreenTopBar = (props) => {
	return (
		<div id="top-bar">
			<span>Find: </span>
			<div className="character-info">
				<img src={waldo} alt="Brown-haired man with glasses and a beanie." />
				<span>Waldo</span>
			</div>
			<div className="character-info">
				<img src={wilma} alt="Brown-haired woman with glasses and a beanie." />
				<span>Wilma</span>
			</div>
			<div className="character-info">
				<img
					src={odlaw}
					alt="Black-haired man with black and yellow clothes."
				/>
				<span>Odlaw</span>
			</div>
			<div className="character-info">
				<img src={wizardwhitebeard} alt="Old wizard with long beard." />
				<span>Wizard Whitebeard</span>
			</div>
			<div className="character-info">
				<img src={woof} alt="White dog with striped tail." />
				<span>Woof</span>
			</div>
		</div>
	);
};

export default GameScreenTopBar;
