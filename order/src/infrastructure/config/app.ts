import express from "express";
import cors from "cors";
import OrderRouter from "../routes/orderRoute"

export const createServer=()=>{
    try{
        const app=express();
        app.use(express.json());
        app.use(cors());

        app.use(OrderRouter)

        return app

    }catch(err){
        console.log(err)
    }
}