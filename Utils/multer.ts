import express, {Request} from "express"
import multer from "multer"
import path from "path"


type callBackDestination = (err:Error | null, destination:string)=> void
type fileNameCallBack = (err:Error | null, filename:string)=> void

const storage = multer.diskStorage({
    destination:function(req:Request, file:any, cb:callBackDestination){
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename:function(req:Request, file:any, cb:callBackDestination){
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random()*1e9)
        cb(null, file.originalname)
    }
})

// export const upload = multer({storage: storage}).single("avatar")
const upload = multer({storage: storage}).single("img")


type DestinationCallBack = (err:Error | null, destination:string)=> void
type fileNameCallBacks = (err:Error | null, filename:string)=> void

const Productstorage = multer.diskStorage({
    destination:function(req:Request, file:any, cb:callBackDestination){
        cb(null, path.join(__dirname, "../uploads"))
    },
    filename:function(req:Request, file:any, cb:callBackDestination){
        const uniqueStuffix = Date.now() + "-" + Math.round(Math.random()*1e9)
        cb(null,file.filedname + uniqueStuffix + "-" + path.extname(file.originalname))
    }
})

export default upload

