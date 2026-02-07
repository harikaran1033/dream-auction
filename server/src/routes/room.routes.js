import express from "express";

import {
  createRoom,
  fetchFranchisePlayers,
  fetchPublicRooms,
  fetchRoomById,
  joinRoom,
} from "../controllers/room.controller.js";

const router = express.Router();

router.post("/", createRoom);
router.get("/public", fetchPublicRooms);
router.post("/join", joinRoom);


router.get("/league/:leagueId/franchise/:franchise", fetchFranchisePlayers);



router.get("/:roomId", fetchRoomById);

export default router;
