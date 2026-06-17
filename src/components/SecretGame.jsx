import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const SecretGame = ({ onClose }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setScore(0);
    setGameOver(false);
    setFood({ x: 15, y: 15 });
  };

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      switch (e.key) {
        case 'ArrowUp':
          setDirection(prev => prev.y !== 1 ? { x: 0, y: -1 } : prev);
          break;
        case 'ArrowDown':
          setDirection(prev => prev.y !== -1 ? { x: 0, y: 1 } : prev);
          break;
        case 'ArrowLeft':
          setDirection(prev => prev.x !== 1 ? { x: -1, y: 0 } : prev);
          break;
        case 'ArrowRight':
          setDirection(prev => prev.x !== -1 ? { x: 1, y: 0 } : prev);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const speed = Math.max(50, INITIAL_SPEED - (score / 100) * 5);
    
    const timer = setTimeout(() => {
      const head = snake[0];
      const newHead = { x: head.x + direction.x, y: head.y + direction.y };

      // Wall collision or self collision
      if (
        newHead.x < 0 || newHead.x >= GRID_SIZE || 
        newHead.y < 0 || newHead.y >= GRID_SIZE || 
        snake.some(s => s.x === newHead.x && s.y === newHead.y)
      ) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...snake];

      // Eat food
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 100);
        let newFood = { x: 0, y: 0 };
        let isValidFood = false;
        while (!isValidFood) {
          newFood = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
          };
          isValidFood = !newSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
        }
        setFood(newFood);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, speed);

    return () => clearTimeout(timer);
  }, [snake, direction, food, gameOver, score]);

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#050505',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Courier New", Courier, monospace',
      color: '#00ff00',
      textShadow: '0 0 5px #00ff00'
    }}>
      {/* CRT Scanline overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        pointerEvents: 'none',
        zIndex: 10
      }}></div>

      <div style={{ marginBottom: '2rem', textAlign: 'center', zIndex: 11 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Terminal size={32} />
          <h1 style={{ fontSize: '3rem', margin: 0, letterSpacing: '4px' }}>SYSTEM COMPROMISED</h1>
        </div>
        <p style={{ fontSize: '1.2rem', color: '#00cc00' }}>IRON CLAW ARCHIVE: SNAKE.EXE</p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>SCORE: {score}</p>
      </div>

      <div style={{
        width: GRID_SIZE * CELL_SIZE,
        height: GRID_SIZE * CELL_SIZE,
        border: '2px solid #00ff00',
        backgroundColor: '#001100',
        position: 'relative',
        boxShadow: '0 0 20px #00ff0033',
        zIndex: 11
      }}>
        {snake.map((segment, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
            backgroundColor: i === 0 ? '#ffffff' : '#00ff00',
            boxShadow: '0 0 5px #00ff00'
          }}></div>
        ))}
        <div style={{
          position: 'absolute',
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
          width: CELL_SIZE - 1,
          height: CELL_SIZE - 1,
          backgroundColor: '#ff0000',
          boxShadow: '0 0 10px #ff0000',
          borderRadius: '50%'
        }}></div>

        {gameOver && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,17,0,0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 12
          }}>
            <h2 style={{ color: '#ff0000', fontSize: '2rem', marginBottom: '1rem', textShadow: '0 0 10px #ff0000' }}>GAME OVER</h2>
            <button 
              onClick={resetGame}
              style={{ background: 'transparent', border: '1px solid #00ff00', color: '#00ff00', padding: '1rem 2rem', fontSize: '1.2rem', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '1rem' }}
            >
              [ REBOOT SYSTEM ]
            </button>
            <button 
              onClick={onClose}
              style={{ background: 'transparent', border: 'none', color: '#00cc00', padding: '0.5rem', cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline' }}
            >
              Return to Headquarters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecretGame;
