import React, { useState, useEffect, useRef } from 'react';
import GameScreenTopBar from './GameScreenTopBar';
import GameEndWindow from './GameEndWindow';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/firestore';

const GameScreen = (props) => {
	const openOptions = (i) => {
		setCellClicked(i);
	};
	const [gameEnded, setGameEnded] = useState(false);
	const [cellClicked, setCellClicked] = useState(null);
	const [identifiedPostions, setIdentifiedPositions] = useState([]);
	const [wrongPosition, setWrongPosition] = useState(null);
	const [time, setTime] = useState(0);
	const [beatRecord, setBeatRecord] = useState(false);
	const userRecordReference = useRef();

	useEffect(() => {
		if (props.userReference !== undefined && props.userReference !== null) {
			props.userReference.current.set(
				{
					startTime: firebase.firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true }
			);
		}
	}, [props.userReference]);

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
			const tenthRecord = documentQuery[0];
			if (
				documentQuery.length < 10 ||
				tenthRecord === undefined ||
				tenthRecord.data().time > time
			) {
				userRecordReference.current = await props.database.current
					.collection('records')
					.add({
						time,
						addedTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
					});
				if (tenthRecord !== undefined) {
					tenthRecord.delete();
				}
				setBeatRecord(true);
			}
		};

		const checkGameEnd = async () => {
			const time = await getTime();
			await checkRecords(time);
			setGameEnded(true);
		};

		if (identifiedPostions.length === 5) {
			checkGameEnd();
		}
	}, [identifiedPostions, props.database, props.userReference]);

	const validateChoice = async (character, position) => {
		const document = await props.database.current
			.collection('images')
			.doc(props.image)
			.get();
		if (document.exists) {
			if (document.data()[character] === position) {
				setIdentifiedPositions(() => identifiedPostions.concat(position));
			} else {
				setWrongPosition(position);
				setTimeout(() => {
					setWrongPosition(null);
				}, 500);
			}
			setCellClicked(null);
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

	return (
		<div id="game-screen">
			<GameScreenTopBar />
			<div id="image-grid">
				{Array(450)
					.fill(0)
					.map((v, i) => (
						<div
							className={
								identifiedPostions.includes(i)
									? 'image-cell-container found'
									: wrongPosition === i
									? 'image-cell-container wrong'
									: 'image-cell-container'
							}
							onClick={() => openOptions(i)}
							key={i}
						>
							<ul
								className={cellClicked === i ? 'drop-down' : 'drop-down hidden'}
							>
								<li onClick={() => validateChoice('waldo', i)}>Waldo</li>
								<li onClick={() => validateChoice('wilma', i)}>Wilma</li>
								<li onClick={() => validateChoice('odlaw', i)}>Odlaw</li>
								<li onClick={() => validateChoice('wizard-whitebeard', i)}>
									Wizard Whitebeard
								</li>
								<li onClick={() => validateChoice('woof', i)}>Woof</li>
							</ul>
						</div>
					))}
			</div>
			<GameEndWindow
				time={time}
				playAgain={props.playAgain}
				beatRecord={beatRecord}
				submitName={submitName}
				className={gameEnded ? '' : 'hidden'}
			/>
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
