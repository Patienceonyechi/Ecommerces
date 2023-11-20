import express, {Application,Request,Response,NextFunction,application} from "express"
import UserModel from "../Model/UserModel"
import profileModel from "../Model/profileModel"
import cloudinary from "../Utils/cloudinary"
import CategoryModel from "../Model/CategoryModel"
import slugify from "slugify"
import { getAllUser } from "./UserController"


function generateStudentId(){
    const characters = "ABCDEFGHIJKLMNOPQRSTUVabctfjhjdndjks";
    const length  =6;
    let randomId = "";
    for(let i = 0; i < length; i++){
        randomId += characters.charAt(
            Math.floor(Math.random() * characters.length)
        )
    }
    return randomId
}


export const createCat =async (req:Request, res:Response)=> {
    try{
      const {name, parent} = req.body
      if(!name)
      {
        return res.status(401).json({
            message: "name can't be empty",
            success: 0
        })
      }
      const {userId} = req.params
      console.log(userId)
      const getAllUser = await UserModel.findOne({_id:userId})
      console.log(getAllUser)

      const dataCat :any= await CategoryModel.create({
        name,
        parent,
        slug: `${slugify(name)}-${generateStudentId()}`
      })
      dataCat.user = getAllUser
      dataCat.save()
      return res.status(201).json({
        message: dataCat
      })

    }catch(error:any)
    {
      return res.status(400).json({
        message: error.message
      })
    }
    
}

export const getAllCat =async (req:Request, res:Response) => {
    try{
        const {id} =req.params
        console.log(id)
        const data =await CategoryModel.find()
        console.log(getAllCat)
    }catch(error:any)
    {
        return res.status(400).json({
            message: error.message
        })
    }
}


export const getSingleCat = async(req: Request, res: Response):Promise<Response>=>{
    const getSing = await UserModel.findById(req.params.id)
    try{
        const getSing = await UserModel.findById(req.params.id).populate(
            {
                path: 'profile',
                select: ""
            }
        )
        return res.status (201).json({
            message: "successfully",
            data: getSing
        })
        
    }catch(error:any)
    {
      return res.status(400).json({
        message: "failed to register user",
        error: error.message
      })
     }
 }