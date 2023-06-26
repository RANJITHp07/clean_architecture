import express,{Router} from "express";
import Productrepository from "../repository/productRepository";
import ProductuseCase from "../../use_case/productUsecase";
import ProductController from "../../adapter/productController";
import {adminverify} from "@auth-middlewares/common"
import Listener from "../repository/listenrepository";
import Publisher from "../repository/publishrepository";


const repository=new Productrepository();
const listener=new Listener()
const publish=new Publisher()
const usecase=new ProductuseCase(repository,publish,listener);
const controller=new ProductController(usecase);

const router=express.Router();

router.post("/api/product",(req,res)=>controller.createProduct(req,res))
router.put("/api/product/update/:id",(req,res)=>controller.updateProduct(req,res))

export default router