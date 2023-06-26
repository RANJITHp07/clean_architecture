import Product from "../../domain/product";
import ProductrepositoryInterface from "../../use_case/interface/productrepositoryinterface";
import { ProductModel } from "../database/productModel";

interface updateProduct{
    productname?:string,
    company?:string,
    price?:number,
    desc?:string,
    quantity?:number
}

class Productrepository implements ProductrepositoryInterface{
    async create(product: Product):Promise<unknown>{
        try{
            const newProduct=new ProductModel(product)
            await newProduct.save()
            return newProduct
        }catch(err){
            console.log(err)
        }
    }

   async  findById(id: string):Promise<unknown> {
        try{
            const product=await ProductModel.findOne({_id:id})
            return product
        }catch(err){
            console.log(err)
        }
    }

    async findByIds(ids: string[]) {
        try {
          const products = await ProductModel.find({ _id: { $in: ids } },{quantity:0});
          return products;
        } catch (err) {
          console.log(err);
        }
      }

    async findByProductname(productname: string):Promise<unknown>{
        try{
            const product=await ProductModel.findOne({productname:productname})
            return product
        }catch(err){
            console.log(err)
        }
    }

    async deleteProduct(id: string):Promise<string>{
        try{
            const product=await ProductModel.findByIdAndDelete({_id:id})
            return "Succesfully Deleted"
        }catch(err){
            return "Error"
            console.log(err)
        }
    }

    async updateProduct(id: string,update:updateProduct):Promise<unknown> {
        try{
            const product=await ProductModel.findByIdAndUpdate({_id:id},{$set:update},{ new: true })
            return product
        }catch(err){
            console.log(err)
        }
    }
}

export default Productrepository