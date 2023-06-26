import User from "../domain/user";
import  Encrypt from "../infrastructure/passwordRepository/hashpassword";
import userRepository from "../infrastructure/repository/userRepository";
import jwtPassword from "../infrastructure/passwordRepository/jwtpassword";
import Listener from "../infrastructure/repository/listenrepository";
import Publisher from "../infrastructure/repository/publishrepository";

class Userusecase{
    private Encrypt:Encrypt;
    private userRepository:userRepository
    private JWTpassword:jwtPassword
    private listner:Listener
    private publish:Publisher
    constructor(Encrypt:Encrypt,userRepository:userRepository,JWTPassword:jwtPassword,publish:Publisher,listner:Listener){
       this.Encrypt=Encrypt,
       this.userRepository=userRepository
       this.JWTpassword=JWTPassword
       this.publish=publish
       this.listner=listner
       this.consumeUserQueue()
    }

    async sigin(user:User){
        const signinUser=await this.userRepository.findByEmail(user.email);
        console.log(signinUser)
        if(signinUser){
           return {
              status:200,
              data:"Already Exist"
           }
        }
        else{
            const newPassword=await this.Encrypt.createHash(user.password)
            const newUser={...user,password:newPassword}
            await this.userRepository.save(newUser)
            return{
                status:200,
                data:newUser
            }
            
        }
    }

    async login(user:User){
        try{
            const userLogin=await this.userRepository.findByEmail(user.email);
            if(userLogin){
                console.log(user.password,userLogin)
                if(await this.Encrypt.compare(user.password,userLogin.password)){
                     const token=this.JWTpassword.createJWT(userLogin._id,userLogin.admin)
                     return {
                        status:200,
                        data:{
                            user:userLogin,
                            token
                        }
                     }
                }
                else{
                    return {
                        status:200,
                        data:"Password wrong"
                     } 
                }
            }else{
                return {
                    status:200,
                    data:"Emailid wrong"
                 } 
            }
        }catch(err){
            console.log(err)
            return {
                status:404,
                data:err
            }
        }
    }

   async getById(id:string){
        const getUser=await this.userRepository.findById(id);
        if(getUser){
            return {
                status:200,
                data:getUser
            }
        }else{
            return {
                status:200,
                data:"No such User"
            }
        }
    }

    async consumeUserQueue() {
        try {
          this.listner.listen("exchange3", "USER", async (orderId: { id: string }) => {
            const id = orderId.id;
            console.log(1)
            const user = await this.userRepository.findById(id);
            console.log(user);
      
            this.publish.publish("exchange4", "USERDETAILS", { user: user });
          });
        } catch (err) {
          console.log(err);
        }
      }
      
}

export default Userusecase