import express from "express"
import type { Request, Response } from "express"
import { PrismaClient } from "../generated/prisma/client.js"
import dotenv from "dotenv"

dotenv.config()

const prisma = new PrismaClient({} as any)
const playerRouter = express.Router()

playerRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { username, tag, highestScore = 0, gamePlayed = 0 } = req.body

    if (!username || !tag) {
      return res.status(400).json({ error: "username and tag are required" })
    }

    const player = await prisma.players.create({
      data: {
        username,
        tag,
        highestScore,
        gamePlayed,
      },
    })

    return res.status(201).json(player)
  } catch (error: any) {
    if (error?.code === "P2002") {
      return res.status(409).json({ error: "A player with this tag already exists" })
    }

    console.error("Failed to create player", error)
    return res.status(500).json({ error: "Failed to create player" })
  }
})

playerRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const players = await prisma.players.findMany({
      include: {
        scores: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return res.status(200).json(players)
  } catch (error) {
    console.error("Failed to fetch players", error)
    return res.status(500).json({ error: "Failed to fetch players" })
  }
})

playerRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id?.toString()

    if (!id) {
      return res.status(400).json({ error: "Player id is required" })
    }

    const player = await prisma.players.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        scores: true,
      },
    })

    if (!player) {
      return res.status(404).json({ error: "Player not found" })
    }

    return res.status(200).json(player)
  } catch (error) {
    console.error("Failed to fetch player", error)
    return res.status(500).json({ error: "Failed to fetch player" })
  }
})

playerRouter.get("/total", async (_req: Request, res: Response) => {
  try {
    const total = await prisma.players.count()
    return res.status(200).json({ total })
  } catch (error) {
    console.error("Failed to count players", error)
    return res.status(500).json({ error: "Failed to count players" })
  }
})

export default playerRouter