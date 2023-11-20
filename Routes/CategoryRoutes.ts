import express from "express"
import {createCat, getAllCat} from "../Controller/CategoryController"
import CategoryModel from "../Model/CategoryModel"

const router = express.Router()

router.route("/create-category/:userId").post(createCat)
router.route("/getall").get(getAllCat)

export default router