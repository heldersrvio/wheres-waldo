import React, { useState, useEffect } from 'react';
import image1 from '../images/resized/image1.jpg';
import image2 from '../images/resized/image2.jpg';
import image3 from '../images/resized/image3.jpg';
import image4 from '../images/resized/image4.jpg';
import image5 from '../images/resized/image5.jpg';
import image6 from '../images/resized/image6.jpg';
import image7 from '../images/resized/image7.jpg';
import image8 from '../images/resized/image8.jpg';
import image9 from '../images/resized/image9.jpg';
import image10 from '../images/resized/image10.jpg';
import icon from '../images/resized/icon.png';
import PropTypes from 'prop-types';
import './GameSelectionWindow.css';

const GameSelectionWindow = (props) => {
	const [chosenPicture, setChosenPicture] = useState(null);
	const [displayLeaderboard, setDisplayLeaderboard] = useState(false);
	const [leaderboadUsers, setLeaderboardUsers] = useState([]);

	useEffect(() => {
		const getRecords = async () => {
			const query = await props.database.current
				.collection('records')
				.orderBy('time', 'asc')
				.get();
			setLeaderboardUsers(
				query.docs.map((document) => {
					return {
						name:
							document.data().name !== undefined
								? document.data().name
								: document.id,
						time: document.data().time,
					};
				})
			);
		};
		if (displayLeaderboard) {
			getRecords();
		}
	}, [displayLeaderboard, props.database, setLeaderboardUsers]);

	const choosePicture = (pictureId) => {
		setChosenPicture(pictureId);
	};

	const captions = [
		'Horseplay in Troy',
		'The Gold Rush',
		'Winter sports',
		'At the Beach',
		'The Great Escape',
		'Lost in the Future',
		'Once upon a Saturday Morning',
		'At the Department Store',
		'Toys! Toys! Toys!',
		'Fun and Games in Ancient Rome',
	];

	const figures = [
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
	].map((image, index) => {
		return (
			<figure
				id={`image${index + 1}`}
				key={`image${index + 1}`}
				onClick={() => choosePicture(`image${index + 1}`)}
				className={chosenPicture === `image${index + 1}` ? 'selected' : ''}
			>
				<img src={image} alt={`Option ${index + 1}`} />
				<figcaption>{captions[index]}</figcaption>
			</figure>
		);
	});

	const mainWindow = (
		<div id="game-selection-window">
			<button
				id="leaderboard-button"
				onClick={() => setDisplayLeaderboard(true)}
			>
				Leaderboard
			</button>
			<div id="top-section">
				<img
					src={icon}
					alt="Man with square jaw wearing glasses and a beanie."
				/>
				<h1 id="first-half">Where's </h1>
				<h1 id="second-half">Waldo</h1>
			</div>
			<div id="bottom-section">
				<span id="picture-selection-message">Select a picture to begin: </span>
				<br></br>
				<div id="picture-options">{figures}</div>
				<div id="play-button-container">
					<button
						id="play-button"
						onClick={() => {
							if (chosenPicture !== null) {
								props.startGame(chosenPicture);
							}
						}}
						className={chosenPicture !== null ? 'available' : 'unavailable'}
					>
						Play
					</button>
				</div>
			</div>
		</div>
	);

	const leaderboard = (
		<div id="game-selection-window">
			<button id="back-button" onClick={() => setDisplayLeaderboard(false)}>
				⬅
			</button>
			<div id="leaderboard">
				{leaderboadUsers.map((user) => {
					return (
						<div id="leaderboard-user">
							<div id="leaderboard-user-name">
								<span>{user.name}</span>
							</div>
							<div id="leaderboard-user-time">
								<span>{user.time} seconds</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);

	return displayLeaderboard ? leaderboard : mainWindow;
};

GameSelectionWindow.propTypes = {
	startGame: PropTypes.func,
	database: PropTypes.object,
};

export default GameSelectionWindow;
