"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../Controller/UserController");
const router = express_1.default.Router();
router.route("/create-User").post(UserController_1.createUser);
router.route("/single-user/:id").get(UserController_1.getSingleUser);
router.route("/login-user").post(UserController_1.LoginUser);
router.route("/get/all").get(UserController_1.getAllUser);
router.route("/log-out").post(UserController_1.logOut);
router.route("/account-verfiy/:id").get(UserController_1.verifyUser);
exports.default = router;
