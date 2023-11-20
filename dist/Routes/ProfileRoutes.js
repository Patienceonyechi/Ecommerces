"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProfileController_1 = require("../Controller/ProfileController");
const multer_1 = __importDefault(require("../Utils/multer"));
const router = express_1.default.Router();
router.route("/edit/pro/:proId").put(ProfileController_1.editProfile);
router.route("/edit/image/:proId").put(multer_1.default, ProfileController_1.editImage);
exports.default = router;
