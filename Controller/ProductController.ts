import express, {Application,Request,Response,NextFunction,application} from "express"
import UserModel from "../Model/UserModel"
import profileModel from "../Model/profileModel"
import cloudinary from "../Utils/cloudinary"
import CategoryModel from "../Model/CategoryModel"
import slugify from "slugify"
import ProductModel from "../Model/ProductModel"
import mongoose from "mongoose"
import path from "path"
export const CreateProduct =async (req:any, res:Response) => {
    try{
        const {name, desc, qty, price,category} = req.body
        // if(!name || !desc || !qty || !price || !category )
        // {
        //     return res.status(401).json({
        //         message: "filed can't be empty"
        //     })
        // }
        const {catId} = req.params
        console.log(catId)
        const getCat:any = await CategoryModel.findOne({_id:catId})
        console.log(getCat)
       

        const {userId} = req.params
        console.log(userId)
        const getUser = await UserModel.findOne({_id:userId})
        console.log(getUser)
        const imageurl =await cloudinary.uploader.upload(req.file.path)
        console.log(imageurl)

        const dataProduct:any = await ProductModel.create({
            name,
            desc,
            qty,
            price,
            category,
            img: "imageUrl.secure_url"
        })

        getCat.product.push(new mongoose.Types.ObjectId(dataProduct._id))
        getCat.save()

        dataProduct.createdby = getUser
        dataProduct.save()
        
        return res.status(201).json({
            success: 1,
            message: dataProduct
        })

    }catch(error:any)
    {
      return res.status(400).json({
        message: error.message
      })
    }
}

