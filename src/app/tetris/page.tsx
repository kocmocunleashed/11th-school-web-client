"use client";

import React, { useState, useEffect, useCallback } from 'react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const INITIAL_SPEED = 700; // Balanced: Start fast but manageable
const LINE_CLEAR_DELAY = 60; // ULTRA SNAPPY: Lightning line clearing
const SPEED_INCREMENT_PER_LINE = 30; // BALANCED: Moderate speed increase
const MIN_SPEED = 150; // PLAYABLE: Nerfed endgame speed for better gameplay

const TETROMINOES = {
  I: [[1, 1, 1, 1]],
  O: [[1, 1], [1, 1]],
  T: [[0, 1, 0], [1, 1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  Z: [[1, 1, 0], [0, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
};

const COLORS = {
  I: '#00f0f0',
  O: '#f0f000',
  T: '#a000f0',
  S: '#00f000',
  Z: '#f00000',
  J: '#0000f0',
  L: '#f0a000',
};

type TetrominoType = keyof typeof TETROMINOES;

interface Piece {
  type: TetrominoType;
  shape: number[][];
  x: number;
  y: number;
  color: string;
}

interface HighScore {
  name: string;
  score: number;
  lines: number;
  date: string;
}

function createEmptyBoard(): number[][] {
  return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0));
}

function createNewPiece(): Piece {
  const types: TetrominoType[] = Object.keys(TETROMINOES) as TetrominoType[];
  const type = types[Math.floor(Math.random() * types.length)];
  const shape = TETROMINOES[type];
  return {
    type,
    shape,
    x: Math.floor(BOARD_WIDTH / 2) - Math.floor(shape[0].length / 2),
    y: 0,
    color: COLORS[type],
  };
}

function rotatePiece(piece: Piece): number[][] {
  const rows = piece.shape.length;
  const cols = piece.shape[0].length;
  const rotated = Array(cols).fill(null).map(() => Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rotated[j][rows - 1 - i] = piece.shape[i][j];
    }
  }

  return rotated;
}

function isValidMove(piece: Piece, board: number[][], newX: number, newY: number, newShape?: number[][]): boolean {
  const shape = newShape || piece.shape;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const boardX = newX + x;
        const boardY = newY + y;

        if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
          return false;
        }

        if (boardY >= 0 && board[boardY][boardX]) {
          return false;
        }
      }
    }
  }

  return true;
}

function getGhostPosition(piece: Piece, board: number[][]): { x: number, y: number } {
  if (!piece) return { x: 0, y: 0 };

  let ghostY = piece.y;
  while (isValidMove(piece, board, piece.x, ghostY + 1)) {
    ghostY++;
  }

  return { x: piece.x, y: ghostY };
}

function mergePieceToBoard(piece: Piece, board: number[][]): number[][] {
  const newBoard = board.map(row => [...row]);

  for (let y = 0; y < piece.shape.length; y++) {
    for (let x = 0; x < piece.shape[y].length; x++) {
      if (piece.shape[y][x]) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;
        if (boardY >= 0) {
          newBoard[boardY][boardX] = piece.type;
        }
      }
    }
  }

  return newBoard;
}

function clearLines(board: number[][]): { newBoard: number[][], linesCleared: number } {
  let linesCleared = 0;
  const newBoard = board.filter(row => {
    if (row.every(cell => cell !== 0)) {
      linesCleared++;
      return false;
    }
    return true;
  });

  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill(0));
  }

  return { newBoard, linesCleared };
}

export default function TetrisGame() {
  const [board, setBoard] = useState<number[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<Piece | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [linesClearedTotal, setLinesClearedTotal] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [heldPiece, setHeldPiece] = useState<Piece | null>(null);
  const [nextPiece, setNextPiece] = useState<Piece | null>(null);
  const [canHold, setCanHold] = useState(true);
  const [isClearingLines, setIsClearingLines] = useState(false);
  const [linesToClear, setLinesToClear] = useState<number[]>([]);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [newHighScorePosition, setNewHighScorePosition] = useState<number | null>(null);

  const startGame = () => {
    setBoard(createEmptyBoard());
    const firstPiece = createNewPiece();
    setCurrentPiece(firstPiece);
    setNextPiece(createNewPiece());
    setGameOver(false);
    setScore(0);
    setLinesClearedTotal(0);
    setIsPlaying(true);
    setSpeed(INITIAL_SPEED);
    setHeldPiece(null);
    setCanHold(true);
    setIsClearingLines(false);
    setLinesToClear([]);
  };

  const moveDown = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying || isClearingLines) return;

    const newY = currentPiece.y + 1;

    if (isValidMove(currentPiece, board, currentPiece.x, newY)) {
      setCurrentPiece({ ...currentPiece, y: newY });
    } else {
      const mergedBoard = mergePieceToBoard(currentPiece, board);

      // Check which lines will be cleared
      const linesToClearNow: number[] = [];
      for (let y = 0; y < mergedBoard.length; y++) {
        if (mergedBoard[y].every(cell => cell !== 0)) {
          linesToClearNow.push(y);
        }
      }

      if (linesToClearNow.length > 0) {
        // Show clearing animation
        setIsClearingLines(true);
        setLinesToClear(linesToClearNow);
        setBoard(mergedBoard);

        // Clear lines after delay for snappier effect
        setTimeout(() => {
          const { newBoard, linesCleared } = clearLines(mergedBoard);
          setBoard(newBoard);

          // Variable scoring system
          let points = 0;
          if (linesCleared === 1) {
            points = 100; // Base score for 1 line
          } else if (linesCleared === 2) {
            points = 200 * 1.2; // 240 points for 2 lines
          } else if (linesCleared === 3) {
            points = 300 * 1.8; // 540 points for 3 lines
          } else if (linesCleared === 4) {
            points = 400 * 2.5; // 1000 points for Tetris (4 lines)
          }

          setScore(prev => prev + points);
          setLinesClearedTotal(prev => prev + linesCleared);
          setIsClearingLines(false);
          setLinesToClear([]);
          setCanHold(true);

          if (linesCleared > 0) {
            setSpeed(prev => Math.max(MIN_SPEED, prev - linesCleared * SPEED_INCREMENT_PER_LINE));
          }

          // Set next piece and generate new one
          if (nextPiece) {
            if (!isValidMove(nextPiece, newBoard, nextPiece.x, nextPiece.y)) {
              setGameOver(true);
              setIsPlaying(false);
            } else {
              setCurrentPiece(nextPiece);
              setNextPiece(createNewPiece());
            }
          }
        }, LINE_CLEAR_DELAY);
      } else {
        // No lines to clear, just continue
        setBoard(mergedBoard);
        setCanHold(true);

        // Set next piece and generate new one
        if (nextPiece) {
          if (!isValidMove(nextPiece, mergedBoard, nextPiece.x, nextPiece.y)) {
            setGameOver(true);
            setIsPlaying(false);
          } else {
            setCurrentPiece(nextPiece);
            setNextPiece(createNewPiece());
          }
        }
      }
    }
  }, [currentPiece, board, gameOver, isPlaying, isClearingLines, nextPiece]);

  const moveHorizontal = useCallback((direction: number) => {
    if (!currentPiece || gameOver || !isPlaying) return;

    const newX = currentPiece.x + direction;

    if (isValidMove(currentPiece, board, newX, currentPiece.y)) {
      setCurrentPiece({ ...currentPiece, x: newX });
    }
  }, [currentPiece, board, gameOver, isPlaying]);

  const rotate = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying) return;

    const rotatedShape = rotatePiece(currentPiece);

    if (isValidMove(currentPiece, board, currentPiece.x, currentPiece.y, rotatedShape)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  }, [currentPiece, board, gameOver, isPlaying]);

  const holdPiece = useCallback(() => {
    if (!currentPiece || gameOver || !isPlaying || !canHold) return;

    if (!heldPiece) {
      setHeldPiece({ ...currentPiece, y: 0 });
      setCurrentPiece(createNewPiece());
    } else {
      const temp = { ...heldPiece };
      setHeldPiece({ ...currentPiece, y: 0 });
      temp.y = currentPiece.y;
      setCurrentPiece(temp);
    }
    setCanHold(false);
  }, [currentPiece, heldPiece, gameOver, isPlaying, canHold]);

  useEffect(() => {
    if (!currentPiece && isPlaying && !gameOver) {
      const piece = createNewPiece();
      setCurrentPiece(piece);
      setNextPiece(createNewPiece());
    }
  }, [currentPiece, isPlaying, gameOver]);

  useEffect(() => {
    // Load high scores from localStorage
    const savedScores = localStorage.getItem('tetrisHighScores');
    if (savedScores) {
      setHighScores(JSON.parse(savedScores));
    } else {
      // Initialize with default scores
      setHighScores([
        { name: 'AAA', score: 10000, lines: 100, date: new Date().toISOString() },
        { name: 'BBB', score: 7500, lines: 75, date: new Date().toISOString() },
        { name: 'CCC', score: 5000, lines: 50, date: new Date().toISOString() },
        { name: 'DDD', score: 2500, lines: 25, date: new Date().toISOString() },
        { name: 'EEE', score: 1000, lines: 10, date: new Date().toISOString() },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save high scores to localStorage whenever they change
    if (highScores.length > 0) {
      localStorage.setItem('tetrisHighScores', JSON.stringify(highScores));
    }
  }, [highScores]);

  useEffect(() => {
    // Check for new high score when game ends
    if (gameOver && score > 0) {
      const minScore = Math.min(...highScores.map(s => s.score));
      if (score > minScore || highScores.length < 10) {
        // New high score!
        const position = highScores.findIndex(s => score > s.score);
        setNewHighScorePosition(position === -1 ? highScores.length : position);
        setShowNameInput(true);
      }
    }
  }, [gameOver, score, highScores]);

  const saveHighScore = () => {
    const name = playerName.trim() || 'Player';
    const newScore: HighScore = {
      name,
      score: Math.floor(score),
      lines: linesClearedTotal,
      date: new Date().toISOString(),
    };

    const newScores = [...highScores, newScore]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setHighScores(newScores);
    setShowNameInput(false);
    setPlayerName('');
    setNewHighScorePosition(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;

      const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' '];
      if (arrowKeys.includes(e.key) || e.key.toLowerCase() === 'c') {
        e.preventDefault();
      }

      switch(e.key) {
        case 'ArrowLeft':
          moveHorizontal(-1);
          break;
        case 'ArrowRight':
          moveHorizontal(1);
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotate();
          break;
        case ' ':
          if (currentPiece) {
            let newY = currentPiece.y;
            while (isValidMove(currentPiece, board, currentPiece.x, newY + 1)) {
              newY++;
            }
            if (newY !== currentPiece.y) {
              setCurrentPiece({ ...currentPiece, y: newY });
            }
          }
          break;
        case 'c':
        case 'C':
          holdPiece();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [moveHorizontal, moveDown, rotate, holdPiece, isPlaying, gameOver, currentPiece, board]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      moveDown();
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, moveDown, speed]);

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);

    // Add ghost piece (where it would drop)
    if (currentPiece && !isClearingLines) {
      const ghostPos = getGhostPosition(currentPiece, board);
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = ghostPos.y + y;
            const boardX = ghostPos.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              // Mark as ghost piece with negative value
              if (!displayBoard[boardY][boardX]) {
                displayBoard[boardY][boardX] = -currentPiece.type.charCodeAt(0);
              }
            }
          }
        }
      }
    }

    // Add current piece
    if (currentPiece && !isClearingLines) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = currentPiece.y + y;
            const boardX = currentPiece.x + x;
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = currentPiece.type;
            }
          }
        }
      }
    }

    return displayBoard;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 md:px-12" style={{ background: '#000000' }}>
      <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 border-2" style={{ borderColor: '#ffb100' }}>
        <h1 className="text-4xl font-bold text-center mb-6" style={{ color: '#ffb100' }}>
          TETRIS
        </h1>

        <div className="flex gap-8 items-start">
          {/* Left Side - High Scores */}
          <div className="w-48">
            <div className="mb-6 p-4 rounded-lg border-2" style={{ background: '#1a1a1a', borderColor: '#ffb100' }}>
              <h3 className="font-bold mb-3 text-center" style={{ color: '#ffb100' }}>TOP 10</h3>
              <div className="space-y-2">
                {highScores.slice(0, 10).map((score, index) => (
                  <div key={index} className="flex justify-between items-center text-sm" style={{ color: index === newHighScorePosition ? '#00ff00' : '#ffffff' }}>
                    <span className="font-mono">{score.name}</span>
                    <span className="font-mono">{score.score.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Game Board */}
          <div className="flex-1">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold mb-2" style={{ color: '#ffb100' }}>
                Score: {Math.floor(score)}
              </p>
              {gameOver && (
                <p className="text-xl mb-2" style={{ color: '#ff0000' }}>
                  Game Over!
                </p>
              )}
            </div>

            <div className="border-4 rounded-lg overflow-hidden mb-6 shadow-lg" style={{ borderColor: '#ffb100', position: 'relative' }}>
              {renderBoard().map((row, y) => (
                <div key={y} className="flex">
                  {row.map((cell, x) => {
                    const isGhost = cell < 0;
                    const isClearing = isClearingLines && linesToClear.includes(y);
                    const actualCell = isGhost ? String.fromCharCode(-cell) as TetrominoType : cell;

                    // VFX PULSING EFFECT for line clearing
                    const animationStyle = isClearing
                      ? {
                          animation: 'pulse 0.06s 3',
                          boxShadow: '0 0 10px #00ff00, inset 0 0 5px #00ff00',
                        }
                      : {};

                    return (
                      <div
                        key={`${y}-${x}`}
                        className="border"
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: isClearing
                            ? '#00ff00'
                            : isGhost
                            ? COLORS[actualCell as TetrominoType] + '80' // MORE VISIBLE: Higher opacity for ghost
                            : cell
                            ? COLORS[cell as TetrominoType]
                            : '#1a1a1a',
                          opacity: isGhost ? 0.6 : 1, // MORE VISIBLE: Increased ghost opacity
                          borderColor: isClearing ? '#00ff00' : '#333333',
                          borderWidth: '1px',
                          boxSizing: 'border-box' as const,
                          ...animationStyle,
                          transition: isClearing ? 'all 0.06s' : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              ))}
              {/* Global VFX animation */}
              <style jsx>{`
                @keyframes pulse {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.1); }
                  100% { transform: scale(1); }
                }
              `}</style>
            </div>

            <div className="text-center mb-4">
              {!isPlaying ? (
                <button
                  onClick={startGame}
                  className="px-8 py-3 rounded-lg font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg"
                  style={{
                    background: '#ffb100',
                    color: '#000000',
                  }}
                >
                  {gameOver ? 'Play Again' : 'Start Game'}
                </button>
              ) : (
                <button
                  onClick={() => setIsPlaying(false)}
                  className="px-8 py-3 rounded-lg font-semibold text-lg"
                  style={{
                    background: '#ff0000',
                    color: '#ffffff',
                  }}
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* Right Side - Game Info */}
          <div className="w-48">
            {/* Lines Destroyed */}
            <div className="mb-6 p-4 rounded-lg border-2" style={{ background: '#1a1a1a', borderColor: '#ffb100' }}>
              <h3 className="font-semibold mb-2 text-center" style={{ color: '#ffb100' }}>Lines</h3>
              <p className="text-3xl font-bold text-center" style={{ color: '#ffffff' }}>
                {linesClearedTotal}
              </p>
            </div>

            {/* Held Piece */}
            <div className="mb-6 p-4 rounded-lg border-2" style={{ background: '#1a1a1a', borderColor: '#ffb100' }}>
              <h3 className="font-semibold mb-3 text-center" style={{ color: '#ffb100' }}>Held</h3>
              <div className="border rounded-md p-2 mx-auto" style={{ borderColor: '#ffb100', minWidth: '120px', minHeight: '80px', background: '#0a0a0a' }}>
                {heldPiece ? (
                  <div className="flex flex-col items-center justify-center">
                    {heldPiece.shape.map((row, y) => (
                      <div key={y} className="flex">
                        {Array.from({ length: 4 }, (_, x) => {
                          const isFilled = row[x] !== undefined && row[x] !== 0;
                          return (
                            <div
                              key={x}
                              className="w-5 h-5 border border-gray-700"
                              style={{
                                backgroundColor: isFilled ? heldPiece.color : 'transparent',
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center text-sm mt-6">Empty</div>
                )}
              </div>
            </div>

            {/* Next Piece */}
            <div className="mb-6 p-4 rounded-lg border-2" style={{ background: '#1a1a1a', borderColor: '#ffb100' }}>
              <h3 className="font-semibold mb-3 text-center text-sm" style={{ color: '#ffb100' }}>Next</h3>
              <div className="border rounded-md p-2 mx-auto" style={{ borderColor: '#ffb100', minWidth: '120px', minHeight: '80px', background: '#0a0a0a' }}>
                {nextPiece ? (
                  <div className="flex flex-col items-center justify-center">
                    {nextPiece.shape.map((row, y) => (
                      <div key={y} className="flex">
                        {Array.from({ length: 4 }, (_, x) => {
                          const isFilled = row[x] !== undefined && row[x] !== 0;
                          return (
                            <div
                              key={x}
                              className="w-5 h-5 border border-gray-700"
                              style={{
                                backgroundColor: isFilled ? nextPiece.color : 'transparent',
                              }}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 text-center text-sm mt-6">Loading...</div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 rounded-lg border-2" style={{ background: '#1a1a1a', borderColor: '#333333' }}>
              <h3 className="font-semibold mb-3 text-center" style={{ color: '#ffb100', fontSize: '14px' }}>Controls</h3>
              <div className="text-xs space-y-1" style={{ color: '#cccccc' }}>
                <p>⬅️ ➡️ - Left/Right</p>
                <p>⬇️ - Down</p>
                <p>⬆️ - Rotate</p>
                <p>Space - Drop</p>
                <p>C - Hold</p>
              </div>
            </div>
          </div>
        </div>

        {/* Name Input Modal for New High Score */}
        {showNameInput && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-2xl p-8 border-2 shadow-2xl" style={{ borderColor: '#ffb100' }}>
              <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#ffb100' }}>
                New High Score!
              </h2>
              <p className="text-xl mb-6 text-center" style={{ color: '#ffffff' }}>
                You reached {newHighScorePosition !== null && newHighScorePosition < 10 ? `#${newHighScorePosition + 1}` : 'top 10'}!
              </p>
              <p className="text-2xl mb-6 text-center font-bold" style={{ color: '#00ff00' }}>
                Score: {Math.floor(score)}
              </p>
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: '#ffb100' }}>
                  Enter your name:
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-2 text-center text-2xl font-bold rounded-lg bg-black border-2"
                  style={{
                    borderColor: '#ffb100',
                    color: '#ffb100',
                  }}
                  autoFocus
                  placeholder="Your name"
                  maxLength={20}
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={saveHighScore}
                  className="flex-1 px-6 py-3 rounded-lg font-bold transition-all hover:scale-105"
                  style={{
                    background: '#00ff00',
                    color: '#000000',
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowNameInput(false);
                    setPlayerName('');
                    setNewHighScorePosition(null);
                  }}
                  className="flex-1 px-6 py-3 rounded-lg font-bold"
                  style={{
                    background: '#ff0000',
                    color: '#ffffff',
                  }}
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
