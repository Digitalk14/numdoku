"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GameBoard from "./components/GameBoard";
import { generateSecretNumber } from "./utils/gameLogic";
import { raleway } from "./components/GameBoard";
import correctness from "./shared/assets/correctness.svg";
import correctPosition from "./shared/assets/correctpositions.svg";

export default function Home() {
  const [secretNumber, setSecretNumber] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showRules, setShowRules] = useState(false);

  useEffect(() => {
    setSecretNumber(generateSecretNumber());
  }, []);

  return (
    <main className="min-h-screen bg-[#F8FAFF] p-6 md:flex md:items-center">
      <div className="max-w-md mx-auto">
        {/* Welcome Dialog */}
        {showWelcome && (
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(197,206,231,0.25)] p-6 mb-6">
            <h2 className={`text-[#1E2B4F] text-2xl mb-4 ${raleway.className}`}>
              Welcome to NumDoku!
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setShowWelcome(false)}
                className="flex-1 bg-[#1E2B4F] text-white py-2 px-4 rounded-lg hover:bg-[#283b6b]"
              >
                Start Game
              </button>
              <button
                onClick={() => setShowRules(true)}
                className="flex-1 border border-[#1E2B4F] text-[#1E2B4F] py-2 px-4 rounded-lg hover:bg-gray-50"
              >
                Rules
              </button>
            </div>
          </div>
        )}

        {/* Rules Dialog */}
        {showRules && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full">
              <h2
                className={`text-[#1E2B4F] text-2xl mb-4 ${raleway.className}`}
              >
                Game Rules
              </h2>
              <div className="text-[#1E2B4F] mb-4 text-sm space-y-2">
                <p>
                  The goal of the game is to guess a 4-digit secret number. Each
                  digit is unique, and digits range from 1 to 9 (0 is not
                  included).
                </p>
                <p>You will receive two clues for each guess:</p>
                <p>
                  <span className="flex items-center gap-1">
                    <b>1. Correct numbers </b>
                    <Image
                      width={15}
                      height={15}
                      src={correctness}
                      alt="Correct digits"
                    />
                    :
                  </span>
                  The number of digits in your guess that match the secret
                  number, regardless of their position.
                </p>
                <p>
                  <span className="flex items-center gap-1">
                    <b>2. Correct positions</b>
                    <Image
                      width={15}
                      height={15}
                      src={correctPosition}
                      alt="Correct positions"
                    />
                    :
                  </span>
                  The number of digits in your guess that are in the correct
                  position.
                </p>
                <ul>
                  For example, if the secret number is 5839 and your guess is
                  9821, the result will be 2/1:
                  <li>Two correct digits (9 and 8).</li>
                  <li>One correct digit in the right position (8).</li>
                  <li>
                    You have 8 tries to guess the secret number. If you guess
                    all 4 digits correctly in the right positions within the 8
                    tries, you win. If not, you lose.
                  </li>
                </ul>
                <p>Good luck! 🎯</p>
              </div>
              <button
                onClick={() => setShowRules(false)}
                className="w-full bg-[#1E2B4F] text-white py-2 px-4 rounded-lg hover:bg-[#283b6b]"
              >
                Got it!
              </button>
            </div>
          </div>
        )}

        {/* Game Container */}
        {!showWelcome && !showRules && (
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(197,206,231,0.25)] p-6">
            <GameBoard secretNumber={secretNumber} />
          </div>
        )}
      </div>
    </main>
  );
}
