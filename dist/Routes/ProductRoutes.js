"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../Controller/ProductController");
const multer_1 = __importDefault(require("../Utils/multer"));
const verify_1 = require("../Utils/verify");
const router = express_1.default.Router();
router.route("/create-product/:catId").post(verify_1.verifyToken, multer_1.default, ProductController_1.CreateProduct);
exports.default = router;
