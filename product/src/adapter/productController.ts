import ProductuseCase from "../use_case/productUsecase";
import {Request,Response} from "express"

class ProductController{
   private readonly productusecase:ProductuseCase

   constructor(Productusecase:ProductuseCase){
     this.productusecase=Productusecase
   }


   async createProduct(req:Request,res:Response){
      const product=await this.productusecase.createProduct(req.body)
      res.status(product.status).json(product.data)
   } 

   async updateProduct(req:Request,res:Response){
      const product=await this.productusecase.updateProduct(req.params.id,req.body);
      res.status(product.status).json(product.data)
   }

   async deleteProduct(req:Request,res:Response){
    const product=await this.productusecase.deleteProduct(req.params.id);
    res.status(product.status).json(product.data)
 }
}

export default ProductController