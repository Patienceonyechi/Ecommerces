"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    img: {
        type: String
    },
    desc: {
        type: String
    },
    qty: {
        type: Number
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    createdby: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", ProSchema);
