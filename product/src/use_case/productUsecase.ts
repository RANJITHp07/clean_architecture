import Product from "../domain/product";
import Listener from "../infrastructure/repository/listenrepository";
import Productrepository from "../infrastructure/repository/productRepository";
import Publisher from "../infrastructure/repository/publishrepository";


interface updateProduct{
    productname?:string,
    company?:string,
    price?:number,
    desc?:string,
    quantity?:number
}

class ProductuseCase{
    private productRepository:Productrepository
    private listner:Listener
    private publish:Publisher
    constructor(productRepository:Productrepository,publish:Publisher,listner:Listener){
        this.productRepository=productRepository
         this.publish=publish
         this.listner=listner
         this.consumeProductQueue()
    }

    async createProduct(product:Product){
        try{
            const products=await this.productRepository.findByProductname(product.productname)
            if(!products){
                const newproduct=await this.productRepository.create(product)
                return {
                    status:200,
                    data:newproduct
                }
            }else{
                return {
                    status:200,
                    data:"Already Exist"
                }
            }
        }catch(err){
            console.log(err)
            return {
                status:401,
                data:err
            }
        }
    }

    async updateProduct(id:string,update:updateProduct){
        try{
            const updatedProduct=await this.productRepository.updateProduct(id,update)
            await  this.publish.publish("exchange5","UPDATEDPRODUCT",{id:id,products:updatedProduct})
            return {
                status:200,
                data:updatedProduct
            }
        }catch(err){
            console.log(err)
            return {
                status:401,
                data:err
            }
        }
    }

    async deleteProduct(id:string){
        try{
            const deleteProduct=await this.productRepository.deleteProduct(id)
            return {
                status:200,
                data:deleteProduct
            }
        }catch(err){
            console.log(err)
            return {
                status:401,
                data:err
            }
        }
    }

    consumeProductQueue() {
        try {
          this.listner.listen("exchange1", "ORDER", async (orderIds) => {
            const ids = orderIds.id;
            console.log(ids)
            const products = await this.productRepository.findByIds(ids);
            await this.publish.publish("exchange2", "PRODUCT", { products: products });
            console.log(products);
          });
        } catch (err) {
          console.log(err);
        }
      }
      
      
}

export default ProductuseCase