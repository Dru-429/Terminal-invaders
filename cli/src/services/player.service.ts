import { randomUUID } from "node:crypto";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { MAX_USERNAME_LENGTH } from "../utils/config.js";
import {
  loadPlayer,
  playerExists,
  savePlayer,
} from "../utils/storag.js";
import { tagGenerator } from "../utils/tagGenerator.js";
import { getStats } from "../services/score.service.js";
import { createPlayer } from "../services/api.service.js";

import type { Player } from "../types/player.types.js";

function isValidUsername(username: string): boolean {
  return (
    username.length > 0 &&
    username.length <= MAX_USERNAME_LENGTH &&
    /^[\w\s-]+$/.test(username)
  );
}

async function waitToStart(): Promise<void> {
  const rl = readline.createInterface({ input, output });

  try {
    await rl.question("\nPress Enter to start the game...");
  } finally {
    rl.close();
  }
}

async function showWelcomeBack(player: Player): Promise<void> {
  const stats = getStats();

  output.write(
    `\nWelcome back, ${getDisplayName(player)}!\n` +
      `Highest score: ${stats.highestScore}\n`
  );

  await waitToStart();
}

async function promptForUsername(): Promise<string> {
  const rl = readline.createInterface({ input, output });

  try {
    while (true) {
      const answer = await rl.question(
        "Welcome to Terminal Invaders!\nEnter your username: "
      );

      const username = answer.trim();

      if (isValidUsername(username)) {
        return username;
      }

      output.write(
        `Invalid username. Use 1-${MAX_USERNAME_LENGTH} letters, numbers, spaces, hyphens, or underscores.\n`
      );
    }
  } finally {
    rl.close();
  }
}

export function getPlayer(): Player | null {
  return loadPlayer();
}

export function getDisplayName(player: Player): string {
  return `${player.username}#${player.tag}`;
}

export async function initializePlayer(): Promise<Player> {
  const existing = loadPlayer();

  if (existing) {
    await showWelcomeBack(existing);
    return existing;
  }

  const username = await promptForUsername();
  const player: Player = {
    playerId: randomUUID(),
    username,
    tag: tagGenerator(),
  };

  savePlayer(player);

  output.write(`\nPlayer created: ${getDisplayName(player)}`);

  try {
    await createPlayer(player);
  } catch (err) {
  }

  await waitToStart();

  return player;
}

export function hasPlayer(): boolean {
  return playerExists();
}
