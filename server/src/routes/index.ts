import express from "express"
import playerRouter from "./player.js";
import scoreRouter from "./score..js";
import leaderboardRoute from "./leaderboard.js";
import syncRouter from "./sync.js";

const routerV1 = express.Router()

routerV1.use("/player", playerRouter)
routerV1.use('/score', scoreRouter)
routerV1.use('/leaderboard', leaderboardRoute) 
routerV1.use('/sync', syncRouter)

export default routerV1