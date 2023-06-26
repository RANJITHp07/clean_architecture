import Order from "../domain/Order";
import OrderRepository from "../infrastructure/repository/orderRepository";
import Listener from "../infrastructure/repository/listenrepository";
import Publisher from "../infrastructure/repository/publishrepository";


interface Product{
  id?:string,
  productname:string,
  company:string,
  price:number,
  desc:string,
}

class OrderUseCase {
  private orderRepository: OrderRepository;
  private listner:Listener
    private publish:Publisher

  constructor(orderRepository: OrderRepository,publish:Publisher,listner:Listener) {
    this.orderRepository = orderRepository;
    this.publish=publish
    this.listner=listner
    this.consumeProductQueue()
  }

  async create(datas: { id: string[], userId: string }) {
    let products: Order[] = [];
     console.log(datas.id)
    await this.publish.publish("exchange1", "ORDER", datas.id );
  
    // Listen for product data
    await new Promise<void>((resolve) => {
      this.listner.listen("exchange2", "PRODUCT", (data: { products: Product[] }) => {
        console.log(data);
        const dataOrder = data.products;
        console.log(dataOrder);
        dataOrder.forEach((item: Product) => {
          this.orderRepository.create({ products: item, userId: datas.userId });
          products.push({ products: item, userId: datas.userId });
        });
        resolve();
      });
    });
  
    return {
      status: 201,
      data: products
    };
  }

  async getProducts(id:string){
     try{
         const products=await this.orderRepository.findUserId(id)
         return {
          status: 201,
          data: products
         }
     }catch(err){
      console.log(err)
      return {
        status: 401,
        data: err
       }
     }
  }

  async getUser(id:string){
    try{
      let user:unknown
        await this.publish.publish("exchange3","USER",{id:id})
        await new Promise<void>((resolve) => {
          this.listner.listen("exchange4", "USERDETAILS", (data) => {
            console.log(data);
            user=data.user
            resolve();
          });
        });
      
        return {
          status: 201,
          data:user
        }
    }catch(err){
      console.log(err)
      return {
        status: 401,
        data: err
       }
     }
  }

  consumeProductQueue() {
    try {
      this.listner.listen("exchange5", "UPDATEDPRODUCT", async (orderIds) => {
        const ids = orderIds.id;
        const product=orderIds.product
        console.log(orderIds.id,orderIds.products)
        const products = await this.orderRepository.findByIdandUpdate(orderIds.id,orderIds.products);
        console.log(products);
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  }
  

export default OrderUseCase;
