import mongoose from "mongoose";
const leaguePlayerSchema = new mongoose.Schema(
  {
    leagueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },

    playerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: true,
    },

    previousFranchise: {
      type: String, // CSK, MI, etc
      required: true,
    },

    basePrice: {
      type: Number,
      required: true,
    },

    franchisePrice: {
      type: Number,
      required: true,
    },

    // 🔥 LEAGUE-SPECIFIC capped status
    isCapped: {
      type: Boolean,
      default: null, // allows null
      required: false, // 👈 THIS IS THE KEY
    },

    auctionStatus: {
      type: String,
      enum: ["unsold", "retained", "sold"],
      default: "unsold",
    },

    soldPrice: {
      type: Number,
      default: null,
    },

    soldToTeamId: {
      type: String, // participantId
      default: null,
    },
  },
  { timestamps: true },
);

// Prevent duplicate league-player entries
leaguePlayerSchema.index({ leagueId: 1, playerId: 1 }, { unique: true });

const LeaguePlayer = mongoose.model("LeaguePlayer", leaguePlayerSchema);
export default LeaguePlayer;
