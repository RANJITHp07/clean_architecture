import { connect,channel,connection } from "./infrastructure/config/rabbitmq";
import { createServer } from "./infrastructure/config/app";
import { connectDB } from "./infrastructure/config/connectdb";

const app=createServer();

// connect(){
//     if(!channel || !connection){
//         throw new Error("RabbitMQ connection not available");
//     }
    
// }

connectDB().then(()=>{
            app?.listen(4000,()=>{
                console.log("connected to the server")
            })
        })