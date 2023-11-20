import express, {Application} from "express"
import cors from "cors"
import UserRoutes from "./Routes/UserRoutes"
import profileRoutes from "./Routes/ProfileRoutes"
import CategoryRoutes from "./Routes/CategoryRoutes"
import ProductRoutes from "./Routes/ProductRoutes"
import CartRoutes from "./Routes/CartRoutes"


export const mainApp = (app:Application) =>{
    app.use(cors()).use(express.json())
    .use("/api/v1", UserRoutes)
    .use("/api/v1", CategoryRoutes)
    .use("/api/v1", ProductRoutes)
    .use("/api/v1", profileRoutes)
    .use("/api/v1", CartRoutes)
    // .get("/api/t", (req:any, res:any)=>{
    //     const id = req.params.id
    //     const  userName = "pepe"
    //     res.render("verifAccount",{userName, id})
       
    // })

    .get("/api", (req:any, res:any)=>{
         res.status(200).json({
            message: "api is ready"
        })
    })
}