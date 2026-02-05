import mongoose from "mongoose";
import Player from "./models/PlayerSchema.model.js";
import LeaguePlayer from "./models/LeaguePlayer.model.js";
import League from "./models/League.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playersData = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "./seed/playersBaseprice.json"),
    "utf-8"
  )
);

const normalizeName = (name) =>
  name
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

async function seedLeaguePlayers() {
  try {
    await mongoose.connect("mongodb://localhost:27017/auctionDB");

    const league = await League.findOne({ shortName: "IPL" });
    if (!league) throw new Error("IPL league not found");

    // 🔥 1️⃣ Load ALL players once
    const allPlayers = await Player.find(
      {},
      { _id: 1, fullName: 1, shortName: 1 }
    );

    // 🔥 2️⃣ Build lookup map
    const playerMap = new Map();

    for (const p of allPlayers) {
      if (p.fullName) {
        playerMap.set(normalizeName(p.fullName), p._id);
      }
      if (p.shortName) {
        playerMap.set(normalizeName(p.shortName), p._id);
      }
    }

    let notFoundCount = 0;

    // 🔥 3️⃣ Seed league players
    for (const item of playersData) {
      const key = normalizeName(item.name);
      const playerId = playerMap.get(key);

      if (!playerId) {
        console.log(`❌ Player not found: "${item.name}"`);
        notFoundCount++;
        continue;
      }

      await LeaguePlayer.create({
        leagueId: league._id,
        playerId,

        previousFranchise: item.franchiseName,
        isCapped: item.isCapped ?? null,
        basePrice: item.basePrice,
        franchisePrice: item.franchisePrice,
      });

      console.log(`✅ Added ${item.name} (${item.franchiseName})`);
    }

    console.log(`🎉 Seeding completed. Missing players: ${notFoundCount}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedLeaguePlayers();
