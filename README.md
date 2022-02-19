# Where's Waldo

![Initial screen](https://i.imgur.com/Qkywvec.png)

A web application created with React that allows users to locate and tag Where's Waldo characters in a picture and stores the time they took to locate all the characters.

There are ten different scenarios to choose from:
* Horseplay in Troy
* The Gold Rush
* Winter Sports
* At the Beach
* The Great Escape
* Lost in the Future
* Once upon a Saturday Morning
* At the Department Store
* Toys! Toys! Toys!
* Fun and Games in Ancient Rome

After picking one of the scenarios, you'll have to locate Waldo, Wilma, Woof, Odlaw and the Wizard Whitebeard inside the picture. When your guess is correct, a green outline will cover the area you've selected. Otherwise, the game will display a red outline (which disappears after a few seconds). If you make it to the top ten players (in terms of time), you can enter your name and join the Leaderboard.

The information of where each character is located in each picture, as well as the users in the Leaderboard and their scores, is stored with [Google Firebase](https://firebase.google.com).

[Take a look at the live version](https://heldersrvio.github.io/wheres-waldo/).

## Running it locally

Make sure Node is installed in your machine. Then, install the packages with ``npm install`` and run it with ``npm start``.
