import express from "express"
import { CreateProduct } from "../Controller/ProductController"
import  upload  from "../Utils/multer"
import { verifyToken } from "../Utils/verify"


const router = express.Router()

router.route("/create-product/:catId").post(verifyToken, upload, CreateProduct)

export default router