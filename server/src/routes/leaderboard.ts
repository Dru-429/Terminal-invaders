import express from "express";
import { PrismaClient } from "@prisma/client/extension";
import type { Request, Response } from "express";
import { startOfWeek } from "date-fns";
 
const leaderboardRoute = express.Router();
const prisma = new PrismaClient();

leaderboardRoute.get("/global", async (req: Request, res: Response) => {
  try {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 25;

    const leadGlobal = await prisma.players.findMany({
      orderBy: {
        highestScore: "desc",
        skip: (page - 1) * limit,
        take: limit,
      },
    });

    res.status(200).json({
      players: leadGlobal,
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
    const currentWeekStart = startOfWeek(new Date(), {
      weekStartsOn: 1,
    })

    const leadWeekly = await prisma.scores.groupBy({
      by: ["playerId"], 
      where: {
        createdAt: {
          gte: currentWeekStart,
        }
      },
      _max: {
        score: true,
      },
      orderBy: {
        _max:{
          score: "desc"
        }, 
        skip: (page - 1) * limit,
        take: limit,
      }
    })

    res.status(200).json({
      pleayers: leadWeekly,
      message: "Weekly leaderboard fetched"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch weekly leaderboard",
    });
  }
});

leaderboardRoute.get("/daily", async (req: Request, res: Response) => {
  try{
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 25;
    const currentDate = new Date();

    const leadDaily = await prisma.scores.groupBy({
      by: ["playerId"],
      where: {
        createdAt: {
          gte: currentDate.setHours(0, 0, 0, 0),
        }
      },
      _max: {
        scrore: true,
      },
      orderBy: {
        _max: {
          score: "desc",
          skip: (page -1) * limit,
          take: limit,
        }
      }
    })

    res.status(200).json({
      players: leadDaily,
      message: "Daily leaderboard fetched"
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch"
    })
  }
});

export default leaderboardRoute;
