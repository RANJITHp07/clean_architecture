import userController from "../../adpater/userController";
import userRepository from "../repository/userRepository";
import Userusecase from "../../use_case/userUsecase";
import Encrypt from "../passwordRepository/hashpassword";
import express, { Router } from "express";
import jwtPassword from "../passwordRepository/jwtpassword";
import {signinverify} from "@auth-middlewares/common"
import Publisher from "../repository/publishrepository";
import Listener from "../repository/listenrepository";

const repository= new userRepository();
const encrypt=new Encrypt();
const publish=new Publisher()
const listener=new Listener()
const JWTPassword=new jwtPassword()
const use_case=new Userusecase(encrypt,repository,JWTPassword,publish,listener)
const controller=new userController(use_case)

const router=express.Router();

router.post("/api/user/signin",(req,res)=>controller.signin(req,res))
router.post("/api/user/login",(req,res)=>controller.login(req,res))
router.get("/api/user/get-user/:id",signinverify,(req,res)=>controller.getUserById(req,res))

export default router