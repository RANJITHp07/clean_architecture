import express from "express";
import cors from "cors";
import ProductRouter from "../route/productRoute"
import Productrepository from "../repository/productRepository";

export const createServer=()=>{
    try{
        const app=express();
        app.use(express.json());
        app.use(cors());

      

        app.use(ProductRouter)

        return app

    }catch(err){
        console.log(err)
    }
}