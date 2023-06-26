import Order from "../../domain/Order";

interface OrderrepositoryInterface{
    create(ordre:Order):Promise<unknown>,
    findUserId(userId:string):Promise<unknown>
    findByIdandUpdate(id:string,products:unknown):Promise<unknown>
}


export default OrderrepositoryInterface