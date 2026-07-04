import express from "express"

const leaderboardRoute = express.Router()

leaderboardRoute.get("/global", async (req, res) => {

})

leaderboardRoute.get("/weekly", async (req, res) => {

})

leaderboardRoute.get("/daily/?date", async (req, res) => {

})

export default leaderboardRoute