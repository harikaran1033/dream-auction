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
    rtm: { total: isRetentionEnabled ? 4 : 0, used: 0 },
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

export const getPublicRooms = async () => {
  return await AuctionRoom.find({
    visibility: "public",
    status: { $ne: "ended" },
  })
    .select("roomName league joinedTeams maxTeams phase createdAt")
    .populate("league", "shortName")
    .lean();
};

export const getRoomById = async (data) => {
  return await AuctionRoom.findById(data)
    .populate("league", "shortName name maxTeams rules homeCountry")
    .lean();
};

export const joinRoom = async (data) => {
  const { roomId, userName, teamName, roomCode } = data;

  // basic validation
  if (!roomId || !userName || !teamName) {
    throw new Error("Missing required fields");
  }

  const room = await AuctionRoom.findById(roomId).populate("league");
  if (!room) {
    throw new Error("Room not found");
  }

  if (room.status === "ended") {
    throw new Error("Room has ended");
  }

  // private room validation
  if (room.visibility === "private") {
    if (!roomCode || room.roomCode !== roomCode) {
      throw new Error("Invalid room code");
    }
  }

  // team already taken?
  const teamTaken = room.joinedTeams.some((t) => t.teamName === teamName);
  if (teamTaken) {
    throw new Error("Team already taken");
  }

  // room full?
  if (room.joinedTeams.length >= room.maxTeams) {
    throw new Error("Room is full");
  }

  // create participantId (THIS is the ID you asked about)
  const participantId = randomUUID();

  // purse comes from league rules (single source of truth)
  const totalPurse = room.league.rules.purseAmount;

  const joinedTeam = {
    participantId,
    userName,
    teamName,
    totalPurse,
    purseRemaining: totalPurse,
    playersCount: 0,
    overseasCount: 0,
    rtm: {
      total: room.retention?.enabled ? 4 : 0,
      used: 0,
    },
  };

  room.joinedTeams.push(joinedTeam);
  await room.save();

  return {
    roomId: room._id,
    participantId,
    room,
  };
};
