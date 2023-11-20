"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary = cloudinary_1.default.v2;
cloudinary.config({
    cloud_name: "dfsjkbn0y",
    api_key: "953674876481861",
    api_secret: "CQNMoW7O9K6u_Jz8Sh8r_srBVj0"
});
exports.default = cloudinary;
