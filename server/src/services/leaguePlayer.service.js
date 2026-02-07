import LeaguePlayer from "../models/LeaguePlayer.model.js";
import mongoose from "mongoose";

export const getPlayersByFranchise = async ({ leagueId, franchise }) => {
  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    throw new Error("Invalid leagueId");
  }

  return LeaguePlayer.find({
    leagueId: new mongoose.Types.ObjectId(leagueId),
    previousFranchise: franchise.trim(),
  })
    .populate(
      "playerId",
      "fullName shortName nationality role battingStyle bowlingStyle"
    )
    .lean();
};
