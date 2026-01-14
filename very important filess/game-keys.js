// Very Important File for Game Controls
// This file contains the special key mappings for the Tetris game

export const HIGH_SCORE_KEY = 'tetrisHighScores';

export const GAME_KEYS = {
  // Movement keys
  MOVE_LEFT: 'ArrowLeft',
  MOVE_RIGHT: 'ArrowRight',
  MOVE_DOWN: 'ArrowDown',
  ROTATE: 'ArrowUp',

  // Special actions
  HARD_DROP: ' ',  // Space bar - Instant drop with snappy line clearing
  HOLD_PIECE: 'c', // Press C to hold/swap current piece

  // Key codes for prevention of default browser behavior
  PREVENT_DEFAULT_KEYS: ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'c', 'C'],
};

export const GAME_CONFIG = {
  BOARD_WIDTH: 10,
  BOARD_HEIGHT: 20,
  INITIAL_SPEED: 700, // BALANCED: Start fast but manageable
  SPEED_INCREMENT_PER_LINE: 30, // BALANCED: Moderate speed increase
  MIN_SPEED: 150, // PLAYABLE: Nerfed endgame speed for better gameplay
  POINTS_PER_LINE: 100, // Base score per line
  LINE_CLEAR_DELAY: 60, // ULTRA SNAPPY: Lightning line clearing
  GHOST_OPACITY: 0.6, // MORE VISIBLE: Ghost piece more visible
  VFX_ENABLED: true, // Visual FX for line clearing
  SCORING_MULTIPLIERS: {
    1: 1.0,    // 1 line: 100 points
    2: 1.2,    // 2 lines: 240 points (200 * 1.2)
    3: 1.8,    // 3 lines: 540 points (300 * 1.8)
    4: 2.5,    // 4 lines (Tetris): 1000 points (400 * 2.5)
  },
  MAX_HIGH_SCORES: 10, // Maximum number of high scores to keep
  DEFAULT_HIGH_SCORES: [
    { name: 'AAA', score: 10000, lines: 100, date: '' },
    { name: 'BBB', score: 7500, lines: 75, date: '' },
    { name: 'CCC', score: 5000, lines: 50, date: '' },
    { name: 'DDD', score: 2500, lines: 25, date: '' },
    { name: 'EEE', score: 1000, lines: 10, date: '' },
  ],
};

// Special message for this very important file
console.log('Very Important Game File Loaded: Tetris Control Configuration');
console.log('Features: Ghost Preview + VFX + Ultra-Fast Speed Curve + High Scores');
console.log('Difficulty: EXTREME - For hardcore Tetris players!');
