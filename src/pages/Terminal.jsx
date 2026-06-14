import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Terminal = () => {
  const [history, setHistory] = useState([
    "Hell Yeah Games Inc. Mainframe OS v9.9.1",
    "Copyright (c) 1999-2026. All rights reserved.",
    "Type 'help' for a list of available commands."
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const navigate = useNavigate();

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    let response = [];
    switch (cmd) {
      case 'help':
        response = [
          "Available commands:",
          "  help      - Show this menu",
          "  status    - Check global empire status",
          "  clear     - Clear terminal",
          "  hack      - Attempt to breach the mainframe",
          "  nukes     - Authorize launch codes",
          "  exit      - Return to HQ Hub"
        ];
        break;
      case 'status':
        response = [
          "Checking Empire nodes...",
          "[OK] Hell Yeah Games (100% Uptime)",
          "[OK] Cyborg Gamers (100% Uptime)",
          "[OK] Kryptotrac (100% Uptime)",
          "[OK] Iron Claw (100% Uptime)",
          "[OK] Gamer Gurls (100% Uptime)",
          "[OK] Hacker Media (100% Uptime)",
          "All systems nominal. World domination at 14%."
        ];
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'hack':
        response = [
          "ACCESS DENIED.",
          "IP address logged.",
          "Dispatching corporate hit squad to your location..."
        ];
        break;
      case 'nukes':
        response = [
          "ERROR: Insufficient clearance.",
          "Only the CEO can authorize the launch sequence."
        ];
        break;
      case 'exit':
        navigate('/');
        return;
      case '':
        response = [];
        break;
      default:
        response = [`Command not found: ${cmd}`];
    }

    setHistory(prev => [...prev, `> ${input}`, ...response]);
    setInput('');
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div style={{
      backgroundColor: '#050505',
      color: '#00ff00',
      fontFamily: 'monospace',
      height: '100vh',
      width: '100vw',
      padding: '2rem',
      boxSizing: 'border-box',
      overflowY: 'auto',
      textShadow: '0 0 5px #00ff00',
      position: 'relative'
    }}>
      {/* CRT Scanline Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%',
        zIndex: 999,
        pointerEvents: 'none'
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '0.2rem' }}>{line}</div>
        ))}
        
        <form onSubmit={handleCommand} style={{ display: 'flex', marginTop: '1rem' }}>
          <span style={{ marginRight: '0.5rem' }}>{'>'}</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            style={{
              background: 'transparent',
              border: 'none',
              color: '#00ff00',
              fontFamily: 'monospace',
              fontSize: '1rem',
              outline: 'none',
              width: '100%',
              textShadow: '0 0 5px #00ff00'
            }}
          />
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Terminal;
