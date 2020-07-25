import React, { useState, useEffect, useRef } from 'react';
import GameSelectionWindow from './components/GameSelectionWindow';
import GameScreen from './components/GameScreen';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './App.css';

const App = () => {
	const [screen, setScreen] = useState('gameSelectionScreen');
	const [currentPicture, setCurrentPicture] = useState(null);
	const database = useRef();
	const userReference = useRef();

	useEffect(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyBp37hX0A2twNYXsE7H9GS5tW6OKvdEse4',
			databaseURL: 'https://where-s-waldo-946f7.firebaseio.com',
			projectId: 'where-s-waldo-946f7',
		};
		firebase.initializeApp(firebaseConfig);
		database.current = firebase.firestore();
	}, []);

	useEffect(() => {
		const createUser = async () => {
			const userDocumentReference = await database.current
				.collection('users')
				.add({
					type: 'user',
				});
			userReference.current = userDocumentReference;
		};
		if (screen === 'gameSelectionScreen') {
			createUser();
		}
	}, [screen]);

	const startGame = (picture) => {
		setScreen('playScreen');
		setCurrentPicture(picture);
	};

	const playAgain = () => {
		setScreen('gameSelectionScreen');
	};

	const currentScreenContainer =
		screen === 'gameSelectionScreen' ? (
			<GameSelectionWindow startGame={startGame} />
		) : (
			<GameScreen
				image={currentPicture}
				playAgain={playAgain}
				database={database}
				userReference={userReference}
			/>
		);

	return <div className="App">{currentScreenContainer}</div>;
};

export default App;
