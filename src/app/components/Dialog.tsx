interface DialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  isGameOver?: boolean;
  onRestart?: () => void;
}

export default function Dialog({ 
  isOpen, 
  title, 
  message, 
  onClose,
  isGameOver = false,
  onRestart
}: DialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    if (isGameOver && onRestart) {
      onRestart();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
        <h2 className="text-xl font-bold mb-4 text-[#333]">{title}</h2>
        <p className="mb-6 text-[#333]">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
} 