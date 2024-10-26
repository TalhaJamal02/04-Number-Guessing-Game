"use client";

import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./ui/Button"; // Adjust this import based on your actual UI library
import { Input } from "./ui/Input"; // Adjust this import based on your actual UI library

export default function NumberGuessing(): JSX.Element {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [targetNumber, setTargetNumber] = useState(0);
  const [userGuess, setUserGuess] = useState<number | string>("");
  const [attempts, setAttempts] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false); // New state variable

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setPaused(false);
    setUserGuess("");
    setAttempts(0);
    setTargetNumber(Math.floor(Math.random() * 10) + 1);
    setInputDisabled(false); // Enable input when starting a new game
  };

  const handleGuess = () => {
    if (userGuess === targetNumber) {
      setGameOver(true);
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 9) {
        setGameOver(true);
      }
    }
    setUserGuess(""); // Reset input after each guess
  };

  const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>) => {
    const guess = parseInt(e.target.value);
    if (!isNaN(guess) && guess >= 1 && guess <= 10) {
      setUserGuess(guess);
    } else {
      setUserGuess("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !gameOver && !paused) {
      handleGuess(); // Trigger guess on Enter key press
    }
  };

  const togglePause = () => {
    setPaused((prev) => {
      const newPausedState = !prev;
      setInputDisabled(newPausedState); // Disable input when paused
      return newPausedState;
    });
  };

  const renderGameControls = () => (
    <div>
      <div className="flex justify-center mb-4">
        <Input
          type="number"
          min="1"
          max="10"
          value={userGuess}
          onChange={handleUserGuessChange}
          onKeyDown={handleKeyPress}
          className="bg-gray-800 border border-gray-600 rounded-lg py-2 px-4 w-full max-w-xs text-white"
          placeholder="Enter your guess"
          disabled={gameOver || inputDisabled} // Disable input based on game state
        />

        <Button
          onClick={handleGuess}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg ml-3 cursor-pointer transition-all duration-500"
          disabled={gameOver || userGuess === "" || inputDisabled} // Disable button based on game state
        >
          Guess
        </Button>
        <Button
          onClick={togglePause}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-500 ml-2"
          disabled={gameOver} // Disable pause button after game over
        >
          {paused ? "Resume" : "Pause"}
        </Button>
      </div>
      <div className="text-center text-white text-lg font-mono">
        <p>Attempts: {attempts}/10</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-600 to-black">
      <div className="bg-gray-800 rounded-lg shadow-lg p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-white tracking-wider font-mono">
          Number Guessing Game
        </h1>
        <p className="text-center text-gray-300 mb-6 ">
          Try to guess the number between 1 and 10!
        </p>

        {!gameStarted && (
          <div className="flex justify-center mb-4">
            <Button
              onClick={startGame}
              className="bg-black hover:bg-gray-900 transition-all duration-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Start Game
            </Button>
          </div>
        )}

        {gameStarted && !gameOver && renderGameControls()}

        {gameOver && (
          <div className="text-center mb-4 text-white">
            <h2 className="text-2xl font-bold font-mono">
              {attempts < 10 ? "Congratulations!" : "Game Over!"}
            </h2>
            <p>
              {attempts < 10
                ? `You guessed the number in ${attempts + 1} attempts.`
                : `You've used all attempts. The number was ${targetNumber}.`}
            </p>
            <Button
              onClick={startGame}
              className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              {attempts < 10 ? "Play Again" : "Try Again"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
