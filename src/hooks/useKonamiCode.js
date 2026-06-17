import { useState, useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const useKonamiCode = () => {
  const [, setSequence] = useState([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      setSequence((prev) => {
        const newSequence = [...prev, key];

        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift();
        }

        if (newSequence.join(',').toLowerCase() === KONAMI_CODE.join(',').toLowerCase()) {
          setIsUnlocked(true);
        }

        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isUnlocked;
};

export default useKonamiCode;