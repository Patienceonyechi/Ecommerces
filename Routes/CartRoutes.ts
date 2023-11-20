import express from "express"
import { addToCart } from "../Controller/CartController"

const router = express.Router()

router.route("/create-cart/:userId/:productId").post(addToCart)

export default router