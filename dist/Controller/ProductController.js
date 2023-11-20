"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const cloudinary_1 = __importDefault(require("../Utils/cloudinary"));
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const ProductModel_1 = __importDefault(require("../Model/ProductModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, desc, qty, price, category } = req.body;
        // if(!name || !desc || !qty || !price || !category )
        // {
        //     return res.status(401).json({
        //         message: "filed can't be empty"
        //     })
        // }
        const { catId } = req.params;
        console.log(catId);
        const getCat = yield CategoryModel_1.default.findOne({ _id: catId });
        console.log(getCat);
        const { userId } = req.params;
        console.log(userId);
        const getUser = yield UserModel_1.default.findOne({ _id: userId });
        console.log(getUser);
        const imageurl = yield cloudinary_1.default.uploader.upload(req.file.path);
        console.log(imageurl);
        const dataProduct = yield ProductModel_1.default.create({
            name,
            desc,
            qty,
            price,
            category,
            img: "imageUrl.secure_url"
        });
        getCat.product.push(new mongoose_1.default.Types.ObjectId(dataProduct._id));
        getCat.save();
        dataProduct.createdby = getUser;
        dataProduct.save();
        return res.status(201).json({
            success: 1,
            message: dataProduct
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.CreateProduct = CreateProduct;
