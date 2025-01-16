import { GuessResult } from "./GameBoard";

interface DialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  guesses: GuessResult[];
  secretNumber: string;
  onClose: () => void;
  isGameOver?: boolean;
  onRestart?: () => void;
}

export default function Dialog({
  isOpen,
  title,
  message,
  guesses,
  secretNumber,
  onClose,
  isGameOver = false,
  onRestart,
}: DialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    if (isGameOver && onRestart) {
      onRestart();
    }
  };
  const secretNumberArray = secretNumber.split("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-[#333] text-center">{title}</h2>
        <p className="mb-6 text-[#333] text-center">{message}</p>
        {guesses.map((guess, index) => (
          <div
            key={index}
            className="grid grid-cols-10 gap-4 py-1 results-container"
          >
            <div className="col-span-10 flex justify-center">
              {guess.guess.split("").map((digit, index) => {
                if (digit === secretNumberArray[index]) {
                  return <span key={index} className="mx-1" style={{ backgroundColor: "#3dc87a" }}>{digit}</span>;
                }else if (secretNumberArray.includes(digit)) {
                  return <span key={index} className="mx-1" style={{ backgroundColor: "#e39846" }}>{digit}</span>;
                }
                return <span key={index} className="mx-1">{digit}</span>;
              })}
            </div>
          </div>
        ))}
        <div className="w-full mt-6">
          <button
            onClick={handleClose}
            className="bg-[#1e2b4f] text-white px-4 py-2 rounded hover:bg-[#2a3b6a] transition-colors w-full"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
