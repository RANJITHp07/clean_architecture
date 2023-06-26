import {Response,Request} from "express"
import OrderUseCase from "../usecase/orderusecase";


interface RequestWithUser extends Request {
    user?: any;
  }
class OrdreController{
    private orderusecase:OrderUseCase
    constructor(orderusecase:OrderUseCase){
      this.orderusecase=orderusecase
    }
  

   async  create(req:RequestWithUser,res:Response){
        try{
           const ordres=await this.orderusecase.create({id:req.body,userId:req.user.id});
           res.status(ordres.status).json(ordres.data)
        }catch(err){
            res.status(401).json(err)
        }
    }

    async getProducts(req:RequestWithUser,res:Response){
        try{
            const products=await this.orderusecase.getProducts(req.params.id)
        res.status(products?.status).json(products.data)
        }
        catch(err){
            console.log(err)
        }
     }

     async getUser(req:RequestWithUser,res:Response){
        try{
            const user=await this.orderusecase.getUser(req.body.id)
        res.status(user.status).json(user.data)
        }
        catch(err){
            res.status(401).json(err)
        } 
     }

    }


export default OrdreController