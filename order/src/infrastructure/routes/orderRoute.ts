import express,{Router} from "express"
import OrderRepository from "../repository/orderRepository";
import OrderUseCase from "../../usecase/orderusecase";
import Listener from "../repository/listenrepository";
import Publisher from "../repository/publishrepository";
import OrdreController from "../../adapter/orderController";
import { signinverify } from "@auth-middlewares/common";


const repository=new OrderRepository();
const listener=new Listener()
const publish=new Publisher()
const use_case=new OrderUseCase(repository,publish,listener);
const controller=new OrdreController(use_case);

const router=express.Router();

router.post("/api/order",signinverify,(req,res)=> controller.create(req,res))
router.get("/api/order/:id",signinverify,(req,res)=> controller.getProducts(req,res))
router.post("/api/order/user",signinverify,(req,res)=> controller.getUser(req,res))

export default router
