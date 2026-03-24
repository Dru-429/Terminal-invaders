# Terminal Invaders

```
 _____                    _                     _
|_   _|                  (_)                   | |
  | | ___  _ __ ___  _ __ _  ___  _ __   __ _  | |__
  | |/ _ \| '_ ` _ \| '__| |/ _ \| '_ \ / _` | | '_ \
  | | (_) | | | | | | |  | | (_) | | | | (_| | | |_) |
  \_/\___/|_| |_| |_|_|  |_|\___/|_| |_|\__, | |_.__/
                                        __/ |         
                                       |___/          
```

## Overview

`Terminal Invaders` is a retro-style shooter built 100% for the command line. It uses Braille-character rendering to achieve higher visual fidelity within a text console, delivering smooth pixel-like animation in a terminal window.

Aliens, bullets, and the player ship are drawn on layered drawille canvases and composited together with colorful terminal-kit output. This is a nostalgic Space Invaders clone with modern Node.js tooling for an immediate plug-and-play CLI experience.

## Features

- High-fidelity sprite designs: a custom X-Wing player ship and classic Space Invader monster variants rendered in Braille dots.
- Multi-layered color rendering:
  - Green ship
  - Red aliens
  - Yellow bullets
  using `terminal-kit` for rich terminal colors.
- Smooth 20 FPS gameplay loop with:
  - collision detection
  - bullet life management
  - score tracking
- Responsive controls and strict challenge mode with a 3-bullet active limit for authentic arcade pacing.
- Progressive alien wave system (2x5 start, 3x5, up to 5x5 rows)

## Tech Stack

- Node.js (runtime)
- `drawille-canvas` (Braille-based canvas rendering)
- `terminal-kit` (terminal control, color output, input handling)
- `figlet` (ASCII art Headers and GAME OVER text)

## Installation

```bash
git clone <your-repo-url>
cd Terminal-invaders
npm install terminal-kit drawille-canvas figlet
```

## Controls

| Key | Action |
|---|---|
| Left Arrow | Move ship left |
| Right Arrow | Move ship right |
| Spacebar | Shoot bullet |
| R | Restart game after game over |
| CTRL+C | Quit application |

## Technical Highlights

- Layering strategy: ship, aliens, and bullets are rendered to separate canvas layers to avoid color bleeding, then merged in a single terminal output pass.
- Game over centering: custom multi-line centering logic draws a figlet `GAME OVER` block and score message in the center overlay and leaves the playfield visible behind.
- Efficient update loop: `setTimeout` at 40ms gives a consistent ~25 updates per second, ensuring responsive input and fluid movement.

## Running

```bash
node index.js
```

> Tip: Use `R` to restart and keep chasing higher score multipliers as the alien grid grows.
