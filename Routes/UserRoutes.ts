import express from "express"
import { createUser, getAllUser, getSingleUser, LoginUser, logOut, verifyUser} from "../Controller/UserController"

const router = express.Router()

router.route("/create-User").post(createUser)
router.route("/single-user/:id").get(getSingleUser)
router.route("/login-user").post(LoginUser)
router.route("/get/all").get( getAllUser)
router.route("/log-out").post(logOut)
router.route("/account-verfiy/:id").get(verifyUser)

export default router