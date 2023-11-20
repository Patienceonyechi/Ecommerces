"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const onLineUrl = "mongodb+srv://onyechiediri:juvIQWw73L4pZUKj@cluster0.isudpct.mongodb.net/Ecommerces";
const url = "mongodb://0.0.0.0:27017/Referencing";
mongoose_1.default.connect(onLineUrl).then(() => {
    console.log("connected to database");
}).catch((error) => {
    console.log(`could not connect ${error}`);
});
exports.default = mongoose_1.default;
// juvIQWw73L4pZUKj
