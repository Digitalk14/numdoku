export function generateSecretNumber(): string {
    const digits = Array.from({ length: 10 }, (_, i) => i.toString());
    let result = '';
    
    // Fisher-Yates shuffle algorithm
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }
    
    // Take first 4 digits
    result = digits.slice(0, 4).join('');
    return result;
  }
  
  export function checkGuess(guess: string, secret: string): { correctNumbers: number, correctPositions: number } {
    let correctPositions = 0;
    let correctNumbers = 0;
    
    // Check correct positions
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        correctPositions++;
      }
    }
    
    // Check correct numbers
    const guessDigits = new Set(guess);
    const secretDigits = new Set(secret);
    guessDigits.forEach(digit => {
      if (secretDigits.has(digit)) {
        correctNumbers++;
      }
    });
    
    return { correctNumbers, correctPositions };
  }