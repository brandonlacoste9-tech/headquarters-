import { useState, useEffect } from 'react';

const useKonamiCode = () => {
  const [sequence, setSequence] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      
      setSequence((prev) => {
        const newSequence = [...prev, key];
        
        // Keep only the last N keystrokes
        if (newSequence.length > konamiCode.length) {
          newSequence.shift();
        }

        // Check if it matches
        if (newSequence.join(',').toLowerCase() === konamiCode.join(',').toLowerCase()) {
          setIsUnlocked(true);
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [konamiCode]);

  return isUnlocked;
};

export default useKonamiCode;
