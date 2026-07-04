import express from "express"
import { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";

const scoreRouter = express.Router()
const prisma = new PrismaClient()

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
  
})

export default scoreRouter
