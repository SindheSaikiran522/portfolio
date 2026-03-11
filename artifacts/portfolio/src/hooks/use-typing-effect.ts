import { useState, useEffect } from 'react';

export function useTypingEffect(
  words: string[],
  typingSpeed: number = 100,
  deletingSpeed: number = 50,
  pauseTime: number = 2000
) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      const targetWord = words[currentWordIndex];
      if (currentText.length === targetWord.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return { text: currentText, isBlinking: currentText.length === words[currentWordIndex].length };
}
