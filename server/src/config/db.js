import mongoose from "mongoose";

const connectDB = async () =>{
      try{
         const conn = await mongoose.connect(process.env.MONGO_URI)
         console.log(`mongo DB connected : ${conn.connection.host}`)
      }catch(error){
           console.log("mongo DB connection fails")
           console.log(error)
           process.exit(1)
      }
}

export default connectDB