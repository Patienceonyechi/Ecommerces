import express from "express"
import { checkOut } from "../Controller/OrderContoller"

const router = express.Router()
router.route("/order-checkout/:userId").post(checkOut)