import * as roomService from "../services/room.service.js"

export const createRoom = async (req,res) => {
     console.log("📥 Create Room API hit");
  console.log("Body:", req.body);
     const room = await roomService.createRoom(req.body)
     
     res.status(201).json(room)    
}