"use client";

import { useState } from "react";
import Image from "next/image";
import { checkGuess } from "../utils/gameLogic";
import Dialog from "./Dialog";
import { Raleway } from "next/font/google";
import correctness from "../shared/assets/correctness.svg";
import correctPosition from "../shared/assets/correctpositions.svg";
export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

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
    <div className="space-y-3">
      <p
        className={`text-[#1E2B4F] text-2xl ${raleway.className} flex justify-between`}
      >
        NumDoku{" "}
        <span className="text-sm text-[#333] flex items-center gap-1">
          {" "}
          Tries left:{" "} <b>{maxTries - guesses.length}</b>
        </span>
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              pattern="[0-9]*"
              inputMode="numeric"
              value={currentGuess}
              onChange={(e) => setCurrentGuess(e.target.value.slice(0, 4))}
              className="w-full p-3 rounded-2xl bg-[#F8FAFF] shadow-[inset_0_2px_4px_rgba(197,206,231,0.25)] text-[#333] text-lg focus:outline-none border border-[#E7ECF3]"
              placeholder="Enter 4 unique digits"
              maxLength={4}
              minLength={4}
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#4D77FF] text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-[#3D67FF] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="text-red-500 h-3 text-xs">
            {hasRecurringDigits && <>Please use unique digits</>}
            {hasZero && !hasRecurringDigits && <>Please use digits 1-9 only</>}
          </div>
        </div>
      </form>
      <div className="space-y-2">
        <div className="grid grid-cols-10 gap-4 font-bold mb-2 text-[#333] text-xs">
          <div className="col-span-4">Guess</div>
          <div className="col-span-3 flex items-center gap-1">
            Digits{" "}
            <Image
              width={15}
              height={15}
              src={correctness}
              alt="Correct digits"
            />
          </div>
          <div className="col-span-3 flex items-center gap-1">
            Positions
            <Image
              width={15}
              height={15}
              src={correctPosition}
              alt="Correct positions"
            />
          </div>
        </div>
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="grid grid-cols-10 gap-4 py-1 results-container"
          >
            <div className="col-span-4">
              {guess.guess.split("").map((digit, index) => (
                <span key={index}>{digit}</span>
              ))}
            </div>
            <div className="col-span-3">
              <span style={{ backgroundColor: "#e39846" }}>
                {guess.correctNumbers}
              </span>
            </div>
            <div className="col-span-3">
              <span style={{ backgroundColor: "#3dc87a" }}>
                {guess.correctPositions}
              </span>
            </div>
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
