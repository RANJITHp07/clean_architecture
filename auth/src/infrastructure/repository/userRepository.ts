import {Response,Request} from "express";
import User from "../../domain/user";
import {UserModel} from "../database/userModel";
import UserRepository from "../../use_case/interface/userController";

class userRepository implements UserRepository{
   
     async save(user: User) {
      console.log(user)
        const newUser=new UserModel(user)
        console.log(newUser)
        await newUser.save();
        return newUser
     }

    async  findById(id: string) {
         const user=await UserModel.findOne({_id:id},{ password: 0 });
         if(user){
            return user
         }
         else{
            return null;
         }
     }

     async findByEmail(email: string) {
        const user=await UserModel.findOne({email:email});
        if(user){
           return user
        }
        else{
           return null;
        }
     }
}

export default userRepository