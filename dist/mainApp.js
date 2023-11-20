"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const ProfileRoutes_1 = __importDefault(require("./Routes/ProfileRoutes"));
const CategoryRoutes_1 = __importDefault(require("./Routes/CategoryRoutes"));
const ProductRoutes_1 = __importDefault(require("./Routes/ProductRoutes"));
const CartRoutes_1 = __importDefault(require("./Routes/CartRoutes"));
const mainApp = (app) => {
    app.use((0, cors_1.default)()).use(express_1.default.json())
        .use("/api/v1", UserRoutes_1.default)
        .use("/api/v1", CategoryRoutes_1.default)
        .use("/api/v1", ProductRoutes_1.default)
        .use("/api/v1", ProfileRoutes_1.default)
        .use("/api/v1", CartRoutes_1.default)
        // .get("/api/t", (req:any, res:any)=>{
        //     const id = req.params.id
        //     const  userName = "pepe"
        //     res.render("verifAccount",{userName, id})
        // })
        .get("/api", (req, res) => {
        res.status(200).json({
            message: "api is ready"
        });
    });
};
exports.mainApp = mainApp;
