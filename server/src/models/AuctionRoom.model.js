import mongoose from "mongoose";

/**
 * Joined Team (room-scoped identity)
 */
const JoinedTeamSchema = new mongoose.Schema(
  {
    // Unique per room (uuid / nanoid)
    participantId: {
      type: String,
      required: true,
    },

    rtm: {
      total: {
        type: Number,
        default: 0,
      },
      used: {
        type: Number,
        default: 0,
      },
    },

    userName: {
      type: String,
      required: true,
    },

    teamName: {
      type: String,
      required: true,
    },

    totalPurse: {
      type: Number,
      required: true,
    },

    purseRemaining: {
      type: Number,
      required: true,
    },

    playersCount: {
      type: Number,
      default: 0,
    },

    overseasCount: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

/**
 * Auction Room
 */
const AuctionRoomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      trim: true,
    },

    league: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "League",
      required: true,
    },

    // Host = room authority (no auth)
    host: {
      participantId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      teamName: {
        type: String,
        required: true,
      },
    },

    rules: {
      maxPlayersPerTeam: {
        type: Number,
        required: true,
      },
      maxOverseasPlayers: {
        type: Number,
        required: true,
      },
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },

    // Used only when visibility = private
    roomCode: {
      type: String,
      sparse: true,
    },

    maxTeams: {
      type: Number,
      required: true,
    },

    joinedTeams: [JoinedTeamSchema],

    /**
     * Runtime auction state
     */
    auction: {
      currentPlayerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
      },

      currentBid: {
        type: Number,
        default: 0,
      },

      highestBidderParticipantId: {
        type: String,
      },

      bidEndsAt: {
        type: Date,
      },
    },

    // inside AuctionRoomSchema
    retention: {
      enabled: {
        type: Boolean,
        default: false,
      },
    },

    phase: {
      type: String,
      enum: ["lobby", "retention", "auction", "ended"],
      default: "lobby",
    },
  },
  { timestamps: true },
);

export default mongoose.model("AuctionRoom", AuctionRoomSchema);
