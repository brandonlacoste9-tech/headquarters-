import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const COMMANDS = ['help', 'status', 'clear', 'hack', 'nukes', 'exit', 'platforms', 'whoami', 'version'];

const BOOT_LINES = [
  { text: 'Hell Yeah Games Inc. Mainframe OS v9.9.1', type: 'system' },
  { text: 'Copyright (c) 1999-2026. All rights reserved.', type: 'dim' },
  { text: "Type 'help' for available commands.", type: 'dim' },
];

const Terminal = () => {
  const [lines, setLines] = useState(BOOT_LINES);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const appendLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback((raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const response = [];

    switch (cmd) {
      case 'help':
        response.push(
          { text: 'Available commands:', type: 'system' },
          { text: '  help       Show this menu', type: 'dim' },
          { text: '  status     Check empire node health', type: 'dim' },
          { text: '  platforms  List network properties', type: 'dim' },
          { text: '  whoami     Display session identity', type: 'dim' },
          { text: '  version    Show mainframe build', type: 'dim' },
          { text: '  clear      Clear terminal', type: 'dim' },
          { text: '  hack       Attempt mainframe breach', type: 'dim' },
          { text: '  nukes      Authorize launch codes', type: 'dim' },
          { text: '  exit       Return to HQ Hub', type: 'dim' },
        );
        break;
      case 'status':
        response.push(
          { text: 'Checking Empire nodes...', type: 'system' },
          { text: '[OK] Hell Yeah Games — 100% uptime', type: 'dim' },
          { text: '[OK] Cyborg Gamers — 100% uptime', type: 'dim' },
          { text: '[OK] Kryptotrac — 100% uptime', type: 'dim' },
          { text: '[OK] Iron Claw — 100% uptime', type: 'dim' },
          { text: '[OK] Gamer Gurls — 100% uptime', type: 'dim' },
          { text: '[OK] Hacker Media — 100% uptime', type: 'dim' },
          { text: 'All systems nominal. World domination at 14%.', type: 'system' },
        );
        break;
      case 'platforms':
        response.push(
          { text: 'EMPIRE NETWORK REGISTRY:', type: 'system' },
          { text: '  → hellyeah-games.com', type: 'dim' },
          { text: '  → cyborggamers.com', type: 'dim' },
          { text: '  → kryptotrac.com', type: 'dim' },
          { text: '  → ironclaw.ca', type: 'dim' },
          { text: '  → gamergurls.com', type: 'dim' },
          { text: '  → hackermedia.fun', type: 'dim' },
        );
        break;
      case 'whoami':
        response.push({ text: 'guest@media-mainframe (clearance: INTERN)', type: 'warn' });
        break;
      case 'version':
        response.push({ text: 'HYG-MFOS 9.9.1-stable (build 2026.06.17)', type: 'system' });
        break;
      case 'clear':
        setLines([]);
        return;
      case 'hack':
        response.push(
          { text: 'ACCESS DENIED.', type: 'error' },
          { text: 'IP address logged.', type: 'error' },
          { text: 'Dispatching corporate hit squad to your location...', type: 'warn' },
        );
        break;
      case 'nukes':
        response.push(
          { text: 'ERROR: Insufficient clearance.', type: 'error' },
          { text: 'Only the CEO can authorize the launch sequence.', type: 'warn' },
        );
        break;
      case 'exit':
        navigate('/');
        return;
      default:
        response.push({ text: `Command not found: ${cmd}`, type: 'error' });
        response.push({ text: "Type 'help' for available commands.", type: 'dim' });
    }

    appendLines([
      { text: `> ${raw}`, type: 'prompt' },
      ...response,
    ]);
  }, [appendLines, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    runCommand(trimmed);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = historyIndex < 0 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(cmdHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()));
      if (match) setInput(match);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal-page" onClick={() => inputRef.current?.focus()} role="application" aria-label="Mainframe terminal">
      <div className="terminal-vignette" aria-hidden="true" />
      <div className="terminal-scanlines" aria-hidden="true" />

      <div className="terminal-content">
        <div className="terminal-toolbar">
          <span>HYG-MAINFRAME // SESSION ACTIVE</span>
          <button type="button" className="terminal-back" onClick={() => navigate('/')}>
            [ESC] EXIT TO HQ
          </button>
        </div>

        {lines.map((line, i) => (
          <div key={`${i}-${line.text.slice(0, 12)}`} className={`terminal-line ${line.type || ''}`}>
            {line.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="terminal-input-row">
          <span className="terminal-prompt-char" aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            aria-label="Terminal command input"
            autoComplete="off"
            spellCheck="false"
          />
          {!input && <span className="terminal-cursor" aria-hidden="true" />}
        </form>
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default Terminal;