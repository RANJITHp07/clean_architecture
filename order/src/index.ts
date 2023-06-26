import { connect } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";


const app=createServer();

connectDB().then(()=>{
            app?.listen(5000,()=>{
                console.log("connected to the server")
            })
        })