import dotenv from "dotenv";
import fs from "fs";

import connectDB from "./config/db.js";
import Player from "./models/PlayerSchema.model.js";

dotenv.config();

const seedPlayers = async () => {
  try {
    await connectDB();

    const playersData = JSON.parse(
      fs.readFileSync("./seed/players.json", "utf-8")
    );

    // optional: clear existing players
    await Player.deleteMany();

    await Player.insertMany(playersData);

    console.log("✅ Global players inserted successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding players:", error);
    process.exit(1);
  }
};

seedPlayers();
