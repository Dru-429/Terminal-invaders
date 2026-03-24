# Terminal Invaders

<img width="1145" height="335" alt="image" src="https://github.com/user-attachments/assets/7de87d6e-9392-4d4f-a782-5a1b986b7032" />

## Installation

### Install from package

```bash
npm i terminal-invaders
```

### Install from source (bash)

```bash
git clone "https://github.com/Dru-429/Terminal-invaders"
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


## Technical Highlights

- Layering strategy avoids color bleed by rendering ship, aliens and bullets on separate layers before compositing.
- Custom center alignment logic draws the figlet `GAME OVER` screen with floating overlay text.
- 40ms frame loop supports smooth gameplay and responsive control.

## Contribution Guide

Thank you for considering enhancement of `TERMINAL INVADERS`!

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Install dependencies and run the game to verify behavior.
4. Make your code changes and keep them focused (gameplay, UI, docs, bug fixes).
5. Add or update tests/docs as needed.
6. Commit with a clear message and push to your fork.
7. Open a pull request with a summary and testing notes.

> We appreciate clean code, minimal side effects, and user-friendly controls.

## Running

```bash
node index.js
```

> Tip: Use `R` to restart and keep chasing higher score multipliers as the alien grid grows.
