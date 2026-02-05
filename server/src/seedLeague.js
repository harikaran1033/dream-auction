import mongoose from "mongoose";
import League from "./models/League.model.js";
import connectDB from "./config/db.js"

async function seedLeague() {
  try {
   await mongoose.connect("mongodb://localhost:27017/auctionDB")    
    // Prevent duplicate seeding
    const existing = await League.findOne({ shortName: "IPL" });
    if (existing) {
      console.log("⚠️ IPL already exists, skipping seeding");
      process.exit(0);
    }

    await League.create({
      name: "Indian Premier League",
      shortName: "IPL",
      homeCountry: "India",
      maxTeams: 10,
      rules: {
        maxPlayersPerTeam: 25,
        maxOverseasPlayers: 8,
        purseAmount: 100000000
      },
      isCustom: false,
      createdBy: "system"
    });

    console.log("✅ IPL league seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding league:", err);
    process.exit(1);
  }
}

seedLeague();
