"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../Controller/CategoryController");
const router = express_1.default.Router();
router.route("/create-category/:userId").post(CategoryController_1.createCat);
router.route("/getall").get(CategoryController_1.getAllCat);
exports.default = router;
