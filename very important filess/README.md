# Very Important Filess

This folder contains critical configuration and documentation for the 11th School Web Client.

## Files in this directory:

### game-keys.js
Contains special key mappings and game configuration for the Tetris game.
- Arrow key controls
- Special actions (C for hold, Space for hard drop)
- Prevention of default browser scrolling behavior
- Game board configuration

## Important Notes

The files in this folder are CRITICAL for game functionality. Modifying these files may cause the Tetris game to malfunction.

**Key Features Controlled Here:**
- **Ghost Preview** - Shows where piece will drop (foreshadowing) - MORE VISIBLE NOW
- **Snappy Line Clearing** - Fast 60ms line destruction animation with VFX
- **Next Piece Preview** - Shows upcoming tetrimino next to held piece
- **Variable Scoring** - Multipliers for 2-4 line clears (Tetris = 1000pts!)
- **Lines Counter** - Shows total lines cleared
- **Balanced Speed** - Nerfed endgame speed for playability
- **High Scores** - Top 10 scores saved to localStorage with player names
- **Name Input** - Modal popup when new high score achieved
- Preventing page scroll with arrow keys during gameplay
- Hold piece functionality (Press 'C' to hold/swap)
- Hard drop with spacebar
- Game speed and scoring configuration

## Special Features

### Ghost Preview System
The game now displays a more visible "ghost" version (60% opacity) of the current piece showing exactly where it will land. This helps players plan their moves better and adds a professional touch to the game.

### VFX Line Clearing
When you complete a line (especially with hard drop), the line clearing animation features:
- ⚡ Lightning fast 60ms delay
- 💚 Pulsing green glow effect
- 🔊 Visual pulse scaling animation
- ✨ Box shadow effects for depth
- Grid fills the entire board

### Variable Scoring System
Multipliers for clearing multiple lines at once:
- **1 line**: 100 points
- **2 lines**: 240 points (1.2x multiplier)
- **3 lines**: 540 points (1.8x multiplier)
- **4 lines (Tetris)**: 1000 points (2.5x multiplier!)

### Lines Destroyed Counter
Displays total number of lines cleared during the game session.

### Balanced Speed Curve
- **Starts at 700ms** (balanced, not too slow)
- **Increases by 30ms per line** (moderate acceleration)
- **Minimum speed: 150ms** (nerfed for playability, still challenging)
- Perfect balance between challenge and enjoyment

### High Score System
- **Local Storage**: Scores persist between browser sessions
- **Top 10 Display**: Shows best 10 scores on left side of game
- **Name Entry**: Modal popup prompts for 3-letter name when high score achieved
- **Automatic Ranking**: Scores are automatically sorted and ranked
- **Default Scores**: Pre-loaded with placeholder scores for competition

### Next Piece Preview
Shows the upcoming tetrimino next to the held piece, allowing players to plan ahead and strategize their moves.

### Extreme Speed Scaling
- 🔥 **Starts at 600ms** (ultra-fast start)
- ⚡ **Increases by 40ms per line** (very aggressive acceleration)
- 💀 **Minimum speed: 50ms** (nearly uncontrollable endgame)
- 📈 Difficulty ramps up extremely quickly

## Security

⚠️ DO NOT modify these files unless you fully understand the game mechanics and control system.
