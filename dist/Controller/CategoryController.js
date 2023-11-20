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
exports.getSingleCat = exports.getAllCat = exports.createCat = void 0;
const UserModel_1 = __importDefault(require("../Model/UserModel"));
const CategoryModel_1 = __importDefault(require("../Model/CategoryModel"));
const slugify_1 = __importDefault(require("slugify"));
function generateStudentId() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVabctfjhjdndjks";
    const length = 6;
    let randomId = "";
    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomId;
}
const createCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, parent } = req.body;
        if (!name) {
            return res.status(401).json({
                message: "name can't be empty",
                success: 0
            });
        }
        const { userId } = req.params;
        console.log(userId);
        const getAllUser = yield UserModel_1.default.findOne({ _id: userId });
        console.log(getAllUser);
        const dataCat = yield CategoryModel_1.default.create({
            name,
            parent,
            slug: `${(0, slugify_1.default)(name)}-${generateStudentId()}`
        });
        dataCat.user = getAllUser;
        dataCat.save();
        return res.status(201).json({
            message: dataCat
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.createCat = createCat;
const getAllCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const data = yield CategoryModel_1.default.find();
        console.log(exports.getAllCat);
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.getAllCat = getAllCat;
const getSingleCat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getSing = yield UserModel_1.default.findById(req.params.id);
    try {
        const getSing = yield UserModel_1.default.findById(req.params.id).populate({
            path: 'profile',
            select: ""
        });
        return res.status(201).json({
            message: "successfully",
            data: getSing
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "failed to register user",
            error: error.message
        });
    }
});
exports.getSingleCat = getSingleCat;
