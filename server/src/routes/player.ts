import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import { prisma } from "../db.js";

dotenv.config();

const playerRouter = express.Router();

playerRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { username, tag, highestScore = 0, gamePlayed = 0 } = req.body;

    if (!username || !tag) {
      return res.status(400).json({ error: "username and tag are required" });
    }
    const exist = await prisma.players.findFirst({
      where: {
        username: username,
        tag: tag,
      },
    });

    if (exist) {
      return res.status(409).json({
        message: "Player alread exits",
      });
    }

    const player = await prisma.players.create({
      data: {
        username,
        tag,
        highestScore,
        gamePlayed,
      },
    });

    return res.status(201).json({
      id: player.id,
      message: "Player created successfully",
    });
  } catch (error: any) {
    console.error("Failed to create player", error);
    return res.status(500).json({ error: "Failed to create player" });
  }
});

// GET /api/v1/player?page=3&limit=25
playerRouter.get("/", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page ) || 1;
    const limit: number = Number(req.query.limit) || 25;

    const players = await prisma.players.findMany({
      orderBy: {
        highestScore: "desc",
      },
      skip: (page -1) * limit,
      take: limit,
    });

    return res.status(200).json(players);
  } catch (error) {
    console.error("Failed to fetch players", error);
    return res.status(500).json({ error: "Failed to fetch players" });
  }
});

playerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    if (!id) {
      return res.status(400).json({ error: "Player id is required" });
    }

    const player = await prisma.players.findUnique({
      where: {
        id: id,
      },
      include: {
        scores: true,
      },
    });

    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    return res.status(200).json(player);
  } catch (error) {
    console.error("Failed to fetch player", error);
    return res.status(500).json({ error: "Failed to fetch player" });
  }
});

playerRouter.get("/total", async (_req: Request, res: Response) => {
  try {
    const total = await prisma.players.count();
    return res.status(200).json({ total });
  } catch (error) {
    console.error("Failed to count players", error);
    return res.status(500).json({ error: "Failed to count players" });
  }
});

export default playerRouter;
