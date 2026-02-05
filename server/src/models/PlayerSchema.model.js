import  mongoose from "mongoose"

const playerSchema = new mongoose.Schema({
      fullName:{type:String,required:true},
      shortName:String,
      nationality:{type:String,required:true},
      role:{
        type:String,
      enum: ["Batsman", "Bowler", "All-Rounder", "Wicketkeeper-Batsman"],
      required:true,  
      },
      jerseyNumber:Number,
      battingStyle:String,
      bowlingStyle:String,
      skillTags:{
        type:[String],
        default:[],
      },      
},
{timestamps:true})


const Player = mongoose.model("Player", playerSchema);

export default Player;