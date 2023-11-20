"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import mongoose from "mongoose"
// import user from"./Routes/AuthRoutes"
const port = 2017;
// const localUrl = "mongodb://0.0.0.0:27017/Kode10xTask"
// const app = express()
// app.use(express.json())
// mongoose.connect(localUrl).then(()=>{
//     console.log("connected to database");
// }).catch(()=>{
//     console.log("could not connect")
// })
// app.use("/api", user)
// app.listen(port,()=>{
//     console.log(`server is running on port: ${port}`)
// })
require("./database/db");
const mainApp_1 = require("./mainApp");
const app = (0, express_1.default)();
(0, mainApp_1.mainApp)(app);
app.set("view engine", "ejs");
const server = app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});
process.on("uncaughtException", (error) => {
    console.log("stop here: uncaughtException");
    console.log(error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("stop here: unhandledRejection");
    console.log(reason);
    server.close(() => {
        process.exit(1);
    });
});
