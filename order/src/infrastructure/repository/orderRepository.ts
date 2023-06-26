import Order from "../../domain/Order";
import OrderModel from "../database/orderModel";
import OrderrepositoryInterface from "../../usecase/interface/orderRepositoryInterface";

class OrderRepository implements OrderrepositoryInterface{

    async create(order:Order):Promise<unknown>{
        try{
             const newOrder=new OrderModel(order)
             await newOrder.save();
             return newOrder
        }catch(err){
            console.log(err);
            return err
        }
    }

    async findUserId(userId:string):Promise<unknown>{
        try{
            const order=await OrderModel.find({userId:userId});
            return order
        }catch(err){
            console.log(err);
            return err
        }
    }


    async  findByIdandUpdate(id: string, products: unknown): Promise<any> {
        try {
          const updatedOrder = await OrderModel.updateMany(
            { 'products._id': id },
            { $set: { products } },
            { new: true }
          );
      
          const updatedDocuments = await OrderModel.findOne({ 'products._id': id });
          return updatedDocuments;
        } catch (err) {
          console.log(err);
          return err;
        }
      }
      

}

export default OrderRepository