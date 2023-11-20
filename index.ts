import express, {Application} from "express"
// import mongoose from "mongoose"
// import user from"./Routes/AuthRoutes"

const port:number = 2017
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
import "./database/db"
import { mainApp } from "./mainApp"


const app:Application = express()
mainApp(app)

app.set("view engine", "ejs")

const server = app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})

process.on("uncaughtException", (error:Error)=>{
    console.log("stop here: uncaughtException")
    console.log(error)
    process.exit(1)
})

process.on("unhandledRejection", (reason:any)=>{
    console.log("stop here: unhandledRejection")
    console.log(reason)
    server.close(()=>{
        process.exit(1)
    })
})