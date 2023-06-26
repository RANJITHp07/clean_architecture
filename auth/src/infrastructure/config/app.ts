import express from "express";
import cors from "cors";
import UserRouter from "../route/userRoute"

export const createServer=()=>{
    try{
        const app=express();
        app.use(express.json());
        app.use(cors());

        app.use(UserRouter)

        return app

    }catch(err){
        console.log(err)
    }
}