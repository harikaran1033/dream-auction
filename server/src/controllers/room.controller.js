import * as roomService from "../services/room.service.js";
import {getIO} from "../sockets/io.js"
import * as leagueService from "../services/leaguePlayer.service.js"

export const createRoom = async (req, res) => {
  console.log("📥 Create Room API hit");
  // console.log("Body:", req.body);
  const room = await roomService.createRoom(req.body);

  res.status(201).json(room);
};

export const fetchPublicRooms = async (req, res) => {
  try {
    const rooms = await roomService.getPublicRooms();
    return res.status(200).json(rooms || []);
  } catch (error) {
    console.error("fetchPublicRooms error:", error);
    return res.status(500).json({
      message: "Failed to fetch public rooms",
    });
  }
};

export const fetchRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await roomService.getRoomById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    return res.status(200).json(room);
  } catch (error) {
    console.error("fetchRoomById error:", error);
    return res.status(500).json({
      message: "Failed to fetch room",
    });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const result = await roomService.joinRoom(req.body);

    const io = getIO()
    io.to(result.roomId.toString()).emit("room-updated",result.room)
    return res.status(200).json(result);
  } catch (error) {
    console.error("joinRoom error:", error);
    return res.status(400).json({
      message: error.message || "Failed to join room",
    });
  }
};


export const fetchFranchisePlayers = async (req, res) => {
  try {
    let { leagueId, franchise } = req.params;

    franchise = franchise.trim();

    const players = await leagueService.getPlayersByFranchise({
      leagueId,
      franchise,
    });
    console.log(players.length)
    console.log("Api hit by fetch",franchise)
    return res.status(200).json(players);
  } catch (err) {
    console.error("❌ fetchFranchisePlayers ERROR:", err); // 👈 ADD THIS
    return res.status(500).json({
      message: "Failed to fetch players",
      error: err.message, // 👈 TEMPORARY
    });
  }
};
