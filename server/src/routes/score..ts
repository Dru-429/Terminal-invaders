import express from "express";
import type { Request, Response } from "express";
import { prisma } from "../db.js";

const scoreRouter = express.Router();

scoreRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { playerId, score } = req.body;

    if (!playerId || typeof score !== "number") {
      return res.status(400).json({
        error: "playerId and score are required",
      });
    }

    const player = await prisma.players.findUnique({
      where: {
        id: playerId,
      },
      select: {
        id: true,
        highestScore: true,
      },
    });

    if (!player) {
      return res.status(404).json({
        error: "Player not found",
      });
    }

    const isHighestScore = score > player.highestScore;

    const result = await prisma.$transaction(async (tx: any) => {
      const newScore = await tx.scores.create({
        data: {
          playerId,
          score,
        },
      });

      await tx.players.update({
        where: {
          id: playerId,
        },
        data: {
          gamePlayed: {
            increment: 1,
          },
          ...(isHighestScore && {
            highestScore: score,
          }),
        },
      });

      return newScore;
    });

    return res.status(201).json({
      message: "Score submitted successfully",
      scoreId: result.id,
      newHighScore: isHighestScore,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to submit score",
    });
  }
});

scoreRouter.get("/:playerId", async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const scoresArray = await prisma.scores.findMany({
      where: {
        playerId: playerId,
      },
      orderBy: {
        skip: (page -1) * limit,
        take: limit,
      }
    });

    if(scoresArray.length === 0) {
      return res.status(404).json({
        error: "No scores found"
      })    
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch scores"
    })
  }
});

export default scoreRouter;
