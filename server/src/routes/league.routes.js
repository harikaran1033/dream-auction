import express from "express";
import League from "../models/League.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const leagues = await League.find(
    {},
    { _id: 1, name: 1, shortName: 1, maxTeams: 1 }
  );
  res.json(leagues);
});

export default router;
