import mongoose from "mongoose";

const leagueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },

    shortName: {
      type: String, // IPL, BBL
      required: true
    },

    homeCountry: {
      type: String, // India, Australia
      required: true
    },

    maxTeams: {
      type: Number, // IPL = 10, BBL = 8
      required: true
    },

    rules: {
      maxPlayersPerTeam: {
        type: Number,
        required: true // 11 / 15 / 25
      },

      maxOverseasPlayers: {
        type: Number,
        required: true // 4 / 6 / 8
      },

      purseAmount: {
        type: Number,
        required: true // stored as number (100000000)
      }
    },

    isCustom: {
      type: Boolean,
      default: false // true if host-created league
    },

    createdBy: {
      type: String, // host name or userId
      default: "system"
    }
  },
  { timestamps: true }
);

const League = mongoose.model("League", leagueSchema);

export default League;
