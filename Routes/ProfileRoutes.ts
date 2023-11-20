import express from "express"
import{ editImage, editProfile } from "../Controller/ProfileController"
import upload from "../Utils/multer"

const router = express.Router()

router.route("/edit/pro/:proId").put(editProfile)
router.route("/edit/image/:proId").put(upload, editImage)

export default router