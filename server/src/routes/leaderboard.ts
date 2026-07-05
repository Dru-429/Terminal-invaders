import express from "express";
import { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";

const leaderboardRoute = express.Router();
const prisma = new PrismaClient();

leaderboardRoute.get("/global", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 25;

    const players = await prisma.players.findMany({
      orderBy: {
        highestScore: "desc",
        skip: (page - 1) * limit,
        take: limit,
      },
    });

    res.status(200).json({
      players,
      message: "Global leaderboard feteched",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch global leaderboard",
    });
  }
});

leaderboardRoute.get("/weekly", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 25;

  } catch (error) {}
});

leaderboardRoute.get("/daily/?date", async (req, res) => {});

export default leaderboardRoute;
