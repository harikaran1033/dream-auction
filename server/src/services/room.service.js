import { randomUUID } from "crypto";
import AuctionRoom from "../models/AuctionRoom.model.js";
import League from "../models/League.model.js";
import { generateRoomCode } from "../utils/roomIDGenerator.js";

export const createRoom = async (data) => {
  const {
    hostUserName,
    hostTeamName,
    leagueId,
    isPrivate,
    isRetentionEnabled,
  } = data;

  if (!hostUserName || !hostTeamName || !leagueId) {
    throw new Error("Missing required fields");
  }

  const league = await League.findById(leagueId);
  if (!league) throw new Error("League not found");

  const participantId = randomUUID();

  const visibility = isPrivate ? "private" : "public";
  const roomCode = await generateRoomCode();

  const totalPurse = league.rules.purseAmount;

  const hostTeam = {
    participantId,
    userName: hostUserName,
    teamName: hostTeamName,
    totalPurse,
    purseRemaining: totalPurse,
    playersCount: 0,
    overseasCount: 0,
    rtm: { total: 0, used: 0 },
  };

  const room = await AuctionRoom.create({
    roomName: `${league.shortName} Auction by ${hostUserName}`,
    league: league._id,

    host: {
      participantId,
      userName: hostUserName,
      teamName: hostTeamName,
    },

    rules: {
      maxPlayersPerTeam: league.rules.maxPlayersPerTeam,
      maxOverseasPlayers: league.rules.maxOverseasPlayers,
    },

    maxTeams: league.maxTeams,

    visibility,
    roomCode,

    retention: { enabled: isRetentionEnabled },

    phase: isRetentionEnabled ? "retention" : "auction",

    joinedTeams: [hostTeam],
  });

  return {
    roomId: room._id,
    participantId,
    phase: room.phase,
    roomCode,
  };
};
