import express from "express";
import cors from "cors";

import leagueRoutes from "./routes/league.routes.js";
import roomRoutes from "./routes/room.routes.js";
import "./models/PlayerSchema.model.js";
import "./models/LeaguePlayer.model.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// 🔴 THIS LINE IS REQUIRED
app.use("/api/leagues", leagueRoutes);
app.use("/api/rooms", roomRoutes);


export default app;
