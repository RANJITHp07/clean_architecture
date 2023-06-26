import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

export const connectDB=async()=>{
    try{
        const mongo_uri=process.env.MONGO_URL;
        if(mongo_uri){
            await mongoose.connect(mongo_uri)
            console.log("Connected to database")
        }
    }catch(err){
        console.log(err)
    }
}