import React, { useState, useEffect, useRef } from 'react';
import GameScreenTopBar from './GameScreenTopBar';
import GameEndWindow from './GameEndWindow';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './GameScreen.css';

const GameScreen = (props) => {
	const openOptions = (i) => {
		if (
			clickedPosition === null &&
			!gameEnded &&
			!identifiedPositions.some(
				(position) =>
					i[0] <= position[0] + 30 &&
					i[0] >= position[0] - 30 &&
					i[1] <= position[1] + 30 &&
					i[1] >= position[1] - 30
			)
		) {
			setClickedPosition(i);
		}
	};
	const [gameEnded, setGameEnded] = useState(false);
	const [clickedPosition, setClickedPosition] = useState(null);
	const [identifiedPositions, setIdentifiedPositions] = useState([]);
	const [identifiedCharacters, setIdentifiedCharacters] = useState([]);
	const [wrongPosition, setWrongPosition] = useState(null);
	const [time, setTime] = useState(0);
	const [beatRecord, setBeatRecord] = useState(false);
	const userRecordReference = useRef();
	const [backgroundImageSource, setBackgroundImageSource] = useState('');
	const [aspectRatio, setAspectRatio] = useState(1);

	useEffect(() => {
		const getImage = async () => {
			const document = await props.database.current
				.collection('images')
				.doc(props.image)
				.get();
			if (document.exists) {
				setBackgroundImageSource(document.data().imageURL);
				setAspectRatio(document.data().ratio);
				return document.data().imageURL;
			}
			return null;
		};

		const recordStartTime = async () => {
			const url = await getImage();
			const img = new Image();
			img.src = url;
			img.onload = () => {
				props.userReference.current.set(
					{
						startTime: firebase.firestore.FieldValue.serverTimestamp(),
					},
					{ merge: true }
				);
			};
			if (img.complete) {
				img.onload();
			}
		};

		if (props.userReference !== undefined && props.userReference !== null) {
			recordStartTime();
		}
	}, [props.userReference, props.database, props.image]);

	useEffect(() => {
		const getTime = async () => {
			const endTime = new Date();
			const userDocument = await props.userReference.current.get();
			if (userDocument.exists) {
				const startTime = userDocument.data().startTime;
				const newTime =
					(endTime.getTime() - startTime.toDate().getTime()) / 1000;
				setTime(newTime);
				return newTime;
			}
			return null;
		};

		const checkRecords = async (time) => {
			const documentQuery = await props.database.current
				.collection('records')
				.orderBy('time', 'desc')
				.get();
			const lastRecord = documentQuery.docs[0];
			if (
				documentQuery.docs.length < 10 ||
				lastRecord === undefined ||
				lastRecord.data().time > time
			) {
				userRecordReference.current = await props.database.current
					.collection('records')
					.add({
						time,
						addedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
					});
				if (documentQuery.docs.length === 10 && lastRecord !== undefined) {
					lastRecord.ref.delete();
				}
				setBeatRecord(true);
			}
		};

		const checkGameEnd = async () => {
			const time = await getTime();
			await checkRecords(time);
			setGameEnded(true);
		};

		if (identifiedPositions.length === 5) {
			checkGameEnd();
		}
	}, [identifiedPositions, props.database, props.userReference]);

	const validateChoice = async (character, position) => {
		const document = await props.database.current
			.collection('images')
			.doc(props.image)
			.get();
		if (document.exists) {
			if (
				document.data()[character][0] <= position[0] + 30 &&
				document.data()[character][0] >= position[0] - 30 &&
				document.data()[character][1] <= position[1] + 30 &&
				document.data()[character][1] >= position[1] - 30
			) {
				setIdentifiedPositions(() => identifiedPositions.concat([position]));
				setIdentifiedCharacters(() => identifiedCharacters.concat([character]));
				setClickedPosition(null);
			} else {
				setWrongPosition(position);
				setTimeout(() => {
					setWrongPosition(null);
					setClickedPosition(null);
				}, 500);
			}
		}
	};

	const submitName = (name) => {
		userRecordReference.current.set(
			{
				name,
			},
			{ merge: true }
		);
	};

	const dropDownStyle =
		clickedPosition !== null
			? {
					top: `${clickedPosition[1] + 30}px`,
					left: `${clickedPosition[0]}px`,
			  }
			: {};

	const waldoFoundCellStyle =
		identifiedPositions[0] !== undefined
			? {
					top: `${identifiedPositions[0][1] - 30}px`,
					left: `${identifiedPositions[0][0] - 30}px`,
			  }
			: {};

	const wilmaFoundCellStyle =
		identifiedPositions[1] !== undefined
			? {
					top: `${identifiedPositions[1][1] - 30}px`,
					left: `${identifiedPositions[1][0] - 30}px`,
			  }
			: {};

	const odlawFoundCellStyle =
		identifiedPositions[2] !== undefined
			? {
					top: `${identifiedPositions[2][1] - 30}px`,
					left: `${identifiedPositions[2][0] - 30}px`,
			  }
			: {};

	const wizardWhitebeardFoundCellStyle =
		identifiedPositions[3] !== undefined
			? {
					top: `${identifiedPositions[3][1] - 30}px`,
					left: `${identifiedPositions[3][0] - 30}px`,
			  }
			: {};

	const woofFoundCellStyle =
		identifiedPositions[4] !== undefined
			? {
					top: `${identifiedPositions[4][1] - 30}px`,
					left: `${identifiedPositions[4][0] - 30}px`,
			  }
			: {};

	const notFoundCellStyle =
		clickedPosition !== null
			? {
					top: `${clickedPosition[1] - 30}px`,
					left: `${clickedPosition[0] - 30}px`,
			  }
			: {};

	const foundCellStyles = [
		waldoFoundCellStyle,
		wilmaFoundCellStyle,
		odlawFoundCellStyle,
		wizardWhitebeardFoundCellStyle,
		woofFoundCellStyle,
		notFoundCellStyle,
	];

	return (
		<div
			id="game-screen"
			style={{ width: `${Math.floor(aspectRatio * 1700)}px` }}
			className={gameEnded ? 'dim' : ''}
		>
			<GameScreenTopBar identifiedCharacters={identifiedCharacters} />
			<div
				id="image-grid"
				style={{
					backgroundImage: `url(${backgroundImageSource})`,
					width: `${Math.floor(aspectRatio * 1700)}px`,
					height: `1690px`,
				}}
				onClick={(e) => {
					openOptions([e.pageX, e.pageY]);
				}}
				className={gameEnded ? 'dim' : ''}
			>
				{!gameEnded
					? Array(6)
							.fill(0)
							.map((v, i) => (
								<div
									className={
										identifiedPositions.length > i
											? 'image-cell-container found'
											: i === 5 && wrongPosition !== null
											? 'image-cell-container wrong'
											: 'image-cell-container'
									}
									id={'image-cell-container-' + i}
									key={i}
									style={foundCellStyles[i]}
								></div>
							))
					: null}
				<ul
					className={
						clickedPosition !== null ? 'drop-down' : 'drop-down hidden'
					}
					style={dropDownStyle}
				>
					<li onClick={() => validateChoice('waldo', clickedPosition)}>
						Waldo
					</li>
					<li onClick={() => validateChoice('wilma', clickedPosition)}>
						Wilma
					</li>
					<li onClick={() => validateChoice('odlaw', clickedPosition)}>
						Odlaw
					</li>
					<li
						onClick={() => validateChoice('wizard-whitebeard', clickedPosition)}
					>
						Wizard Whitebeard
					</li>
					<li onClick={() => validateChoice('woof', clickedPosition)}>Woof</li>
				</ul>
			</div>
			<div id="pop-up-game-end-window" className={gameEnded ? '' : 'hidden'}>
				<GameEndWindow
					time={time}
					playAgain={props.playAgain}
					beatRecord={beatRecord}
					submitName={submitName}
					gameEnded={gameEnded}
				/>
			</div>
		</div>
	);
};

GameScreen.propTypes = {
	image: PropTypes.string,
	playAgain: PropTypes.func,
	database: PropTypes.object,
	userReference: PropTypes.object,
};

export default GameScreen;
