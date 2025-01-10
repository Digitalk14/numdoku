"use client";

import { useState } from "react";
import { checkGuess } from "../utils/gameLogic";
import Dialog from "./Dialog";
import { raleway } from "../layout";

interface GuessResult {
  guess: string;
  correctNumbers: number;
  correctPositions: number;
}

interface GameBoardProps {
  secretNumber: string;
}

export default function GameBoard({ secretNumber }: GameBoardProps) {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
  }>({
    isOpen: false,
    title: "",
    message: "",
  });
  const maxTries = 8;

  const hasRecurringDigits =
    currentGuess.length === 4 && new Set(currentGuess).size !== 4;

  const hasZero = currentGuess.includes("0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentGuess === secretNumber) {
      setDialog({
        isOpen: true,
        title: "Congratulations!",
        message: "You won! You guessed the correct number!",
      });
    } else {
      const result = checkGuess(currentGuess, secretNumber);
      const newGuesses = [{ guess: currentGuess, ...result }, ...guesses];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (newGuesses.length >= maxTries) {
        setDialog({
          isOpen: true,
          title: "Game Over",
          message: `You've run out of tries!\n The correct number was ${secretNumber}.`,
        });
      }
    }
  };

  const resetGame = () => {
    setCurrentGuess("");
    setGuesses([]);
    setDialog({ isOpen: false, title: "", message: "" });
  };
  return (
    <div className="space-y-6">
      <p className={`text-[#1E2B4F] text-2xl ${raleway.className}`}>NumDoku</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.slice(0, 4))}
              className="flex-1 p-3 rounded-2xl bg-[#F8FAFF] shadow-[inset_0_2px_4px_rgba(197,206,231,0.25)] text-[#333] text-lg focus:outline-none border border-[#E7ECF3]"
              placeholder="Enter 4 unique digits"
              maxLength={4}
              minLength={4}
            />
            <button
              type="submit"
              className="bg-[#4D77FF] text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-[#3D67FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                currentGuess.length !== 4 ||
                !/^\d+$/.test(currentGuess) ||
                hasRecurringDigits ||
                hasZero
              }
            >
              Try
            </button>
          </div>
          {hasRecurringDigits && (
            <div className="text-red-500">Please use unique digits</div>
          )}
          {hasZero && (
            <div className="text-red-500">Please use digits 1-9 only</div>
          )}
        </div>
      </form>
      <div className="mt-4 text-[#333]">
        Remaining tries: {maxTries - guesses.length}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-4 font-bold mb-2 text-[#333] text-xs">
          <div>Guess</div>
          <div>Correct digits</div>
          <div>Correct positions</div>
        </div>
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 py-1 results-container"
          >
            <div>
            {
              guess.guess.split('').map((digit, index) => (
                <span key={index}>{digit}</span>
              ))
            }
            </div>
            
            <div><span style={{backgroundColor: '#e39846'}}>{guess.correctNumbers}</span></div>
            <div><span style={{backgroundColor: '#3dc87a'}}>{guess.correctPositions}</span></div>
          </div>
        ))}
      </div>
      <Dialog
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        onClose={() => setDialog({ isOpen: false, title: "", message: "" })}
        isGameOver={
          dialog.title.includes("Game Over") ||
          dialog.title.includes("Congratulations")
        }
        onRestart={resetGame}
      />
    </div>
  );
}
