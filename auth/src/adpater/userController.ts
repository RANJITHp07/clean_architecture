import {Response,Request} from "express";
import Userusecase from "../use_case/userUsecase";


class userController{
    private userCase:Userusecase
  constructor(usercase:Userusecase){
       this.userCase=usercase
   }

   async signin(req:Request,res:Response){
      try{
         const user=await this.userCase.sigin(req.body);
         res.status(user.status).json(user.data)
      }catch(err){
         console.log(err)
         res.status(401).json(err)
      }
   }
   
   async login(req:Request,res:Response){
      try{
         const userLogin=await this.userCase.login(req.body);
      if(userLogin){
         res.status(userLogin?.status).json(userLogin.data)
      }
      }catch(err){
         console.log(err)
         res.status(401).json(err)
      }
   }

   async getUserById(req:Request,res:Response){
      try{
         const getUser=await this.userCase.getById(req.params.id);
      if(getUser){
         res.status(getUser?.status).json(getUser.data)
      }
      }catch(err){
         console.log(err)
         res.status(401).json(err)
      }
   }
}

export default userController